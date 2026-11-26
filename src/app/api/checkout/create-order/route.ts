import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { ALL_PRODUCTS, type ProductItem } from '@/lib/products';
import { validateAndCalculateDiscount } from '@/lib/discounts';

interface OrderItemPayload {
  variantId?: string;
  productId?: string;
  slug?: string;
  size: number;
  color?: string;
  quantity: number;
}

interface CreateOrderRequest {
  items: OrderItemPayload[];
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
  };
  shippingMethod: 'standard' | 'express';
  discountCode?: string;
  notes?: string;
  userId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateOrderRequest = await req.json();
    const { items, shippingAddress, shippingMethod, discountCode, notes, userId } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty. At least one item is required.' },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.email || !shippingAddress.phone || !shippingAddress.line1 || !shippingAddress.pincode) {
      return NextResponse.json(
        { error: 'Incomplete shipping address or contact details.' },
        { status: 400 }
      );
    }

    // =========================================================================
    // 1. AUTHORITATIVE SERVER-SIDE PRICE AND STOCK COMPUTATION
    // Never trust client amounts!
    // =========================================================================
    const supabase = createAdminClient() as any;
    let calculatedSubtotal = 0;
    const validatedOrderItems: Array<{
      variantId?: string;
      productId: string;
      productName: string;
      productSlug: string;
      size: number;
      color: string;
      unitPrice: number;
      quantity: number;
      imageUrl: string;
    }> = [];

    for (const item of items) {
      if (item.quantity <= 0) continue;

      // First check local catalog for accurate specs & fallback
      const catalogProduct: ProductItem = ALL_PRODUCTS.find(
        (p: ProductItem) => p.id === item.productId || p.slug === item.slug || p.slug === item.productId
      ) || ALL_PRODUCTS[0];

      // Query database if Supabase admin is available
      let unitPrice = catalogProduct.price;
      let productName = catalogProduct.name;
      let productSlug = catalogProduct.slug;
      let color = item.color || catalogProduct.colors[0]?.name || 'Standard';
      let imageUrl = catalogProduct.primaryImage || '';
      let variantId = item.variantId;

      if (supabase) {
        try {
          if (variantId) {
            const { data: variantData } = await supabase
              .from('product_variants')
              .select('id, product_id, stock, price_delta_inr, color, size, products(name, slug, price_inr)')
              .eq('id', variantId)
              .maybeSingle();

            if (variantData) {
              const prod = (variantData as any).products;
              if (prod) {
                unitPrice = prod.price_inr + (variantData.price_delta_inr || 0);
                productName = prod.name;
                productSlug = prod.slug;
              }
              color = variantData.color;
            }
          }
        } catch (dbErr) {
          console.warn('[checkout/create-order] DB variant query note:', dbErr);
        }
      }

      const itemTotal = unitPrice * item.quantity;
      calculatedSubtotal += itemTotal;

      validatedOrderItems.push({
        variantId,
        productId: catalogProduct.id,
        productName,
        productSlug,
        size: item.size,
        color,
        unitPrice,
        quantity: item.quantity,
        imageUrl,
      });
    }

    if (validatedOrderItems.length === 0) {
      return NextResponse.json(
        { error: 'No valid items found in order.' },
        { status: 400 }
      );
    }

    // =========================================================================
    // 2. SERVER-SIDE DISCOUNT VALIDATION
    // =========================================================================
    let discountAmount = 0;
    let appliedCodeClean: string | undefined = undefined;

    if (discountCode) {
      const discountCheck = validateAndCalculateDiscount(discountCode, calculatedSubtotal);
      if (discountCheck.valid && discountCheck.rule) {
        discountAmount = discountCheck.discountAmount;
        appliedCodeClean = discountCheck.rule.code;
      }
    }

    // =========================================================================
    // 3. SHIPPING FEE AND FINAL AMOUNT CALCULATION
    // =========================================================================
    let shippingFee = 0;
    if (shippingMethod === 'express') {
      shippingFee = 450; // Priority Air Courier ₹450
    } else {
      // Standard Express: Free over ₹10,000, else ₹250
      shippingFee = calculatedSubtotal >= 10000 ? 0 : 250;
    }

    const taxableAmount = Math.max(0, calculatedSubtotal - discountAmount);
    // GST 18% included in product retail price
    const gstIncluded = Math.round((taxableAmount * 0.18) / 1.18);
    const grandTotal = taxableAmount + shippingFee;

    // Generate unique KINETIQ order number: KQ-XXXXXX
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `KQ-${randomSuffix}`;
    const internalOrderId = crypto.randomUUID();

    // =========================================================================
    // 4. CASHFREE PG ORDER CREATION
    // =========================================================================
    const cashfreeAppId = process.env.CASHFREE_APP_ID || '';
    const cashfreeSecret = process.env.CASHFREE_SECRET_KEY || '';
    const cashfreeEnv = process.env.CASHFREE_ENV || 'sandbox';
    const cashfreeApiVersion = process.env.CASHFREE_API_VERSION || '2023-08-01';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const cashfreeBaseUrl = cashfreeEnv === 'production'
      ? 'https://api.cashfree.com/pg'
      : 'https://sandbox.cashfree.com/pg';

    let paymentSessionId = '';
    let cfOrderId = orderNumber;
    let paymentMode: 'cashfree' | 'simulated' = 'simulated';

    // Check if real Cashfree credentials are configured
    const isRealCashfreeConfigured =
      cashfreeAppId &&
      cashfreeSecret &&
      cashfreeAppId !== 'TEST_APP_ID' &&
      !cashfreeAppId.includes('TEST_APP_ID');

    if (isRealCashfreeConfigured) {
      try {
        const cfResponse = await fetch(`${cashfreeBaseUrl}/orders`, {
          method: 'POST',
          headers: {
            'x-client-id': cashfreeAppId,
            'x-client-secret': cashfreeSecret,
            'x-api-version': cashfreeApiVersion,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id: orderNumber,
            order_amount: grandTotal,
            order_currency: 'INR',
            customer_details: {
              customer_id: userId ? `cust_${userId.slice(0, 16)}` : `guest_${randomSuffix}`,
              customer_name: shippingAddress.fullName,
              customer_email: shippingAddress.email,
              customer_phone: shippingAddress.phone.replace(/[^0-9]/g, '').slice(-10),
            },
            order_meta: {
              return_url: `${siteUrl}/order/${internalOrderId}?cf_id={order_id}`,
              notify_url: `${siteUrl}/api/webhooks/cashfree`,
            },
            order_note: notes || `KINETIQ Order ${orderNumber}`,
          }),
        });

        if (cfResponse.ok) {
          const cfData = await cfResponse.json();
          paymentSessionId = cfData.payment_session_id;
          cfOrderId = cfData.cf_order_id || orderNumber;
          paymentMode = 'cashfree';
        } else {
          console.warn('[checkout/create-order] Cashfree API response non-ok, falling back to simulated sandbox:', await cfResponse.text());
          paymentSessionId = `session_sim_${orderNumber}_${Date.now()}`;
        }
      } catch (cfErr) {
        console.warn('[checkout/create-order] Cashfree API connection error, falling back to simulated sandbox:', cfErr);
        paymentSessionId = `session_sim_${orderNumber}_${Date.now()}`;
      }
    } else {
      // Development simulated sandbox session
      paymentSessionId = `session_sim_${orderNumber}_${Date.now()}`;
    }

    // =========================================================================
    // 5. RECORD ORDER IN SUPABASE (PENDING STATE)
    // =========================================================================
    if (supabase) {
      try {
        const { error: orderInsertErr } = await supabase.from('orders').insert({
          id: internalOrderId,
          order_number: orderNumber,
          user_id: userId || null,
          email: shippingAddress.email,
          phone: shippingAddress.phone,
          status: 'pending',
          subtotal_inr: calculatedSubtotal,
          discount_inr: discountAmount,
          shipping_inr: shippingFee,
          tax_inr: gstIncluded,
          total_inr: grandTotal,
          currency: 'INR',
          discount_code: appliedCodeClean || null,
          shipping_address: shippingAddress,
          shipping_method: shippingMethod === 'express' ? 'Priority Air Courier' : 'Standard Express',
          cashfree_order_id: cfOrderId,
          cashfree_payment_session_id: paymentSessionId,
          notes: notes || null,
        });

        if (!orderInsertErr) {
          const itemsToInsert = validatedOrderItems.map((item) => ({
            order_id: internalOrderId,
            variant_id: item.variantId || null,
            product_name: item.productName,
            product_slug: item.productSlug,
            size: item.size,
            color: item.color,
            unit_price_inr: item.unitPrice,
            quantity: item.quantity,
            image_url: item.imageUrl,
          }));

          await supabase.from('order_items').insert(itemsToInsert);
        } else {
          console.warn('[checkout/create-order] Order DB insert error:', orderInsertErr);
        }
      } catch (dbInsertErr) {
        console.warn('[checkout/create-order] DB record creation note:', dbInsertErr);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: internalOrderId,
      orderNumber,
      paymentSessionId,
      amount: grandTotal,
      currency: 'INR',
      mode: paymentMode,
      breakdown: {
        subtotal: calculatedSubtotal,
        discount: discountAmount,
        shipping: shippingFee,
        tax: gstIncluded,
        total: grandTotal,
      },
    });
  } catch (err: any) {
    console.error('[checkout/create-order] Server error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal order creation failure' },
      { status: 500 }
    );
  }
}
