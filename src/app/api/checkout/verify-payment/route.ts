import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const { orderId, orderNumber, paymentId, simulateSuccess } = await req.json();

    if (!orderId && !orderNumber) {
      return NextResponse.json({ error: 'Order reference required' }, { status: 400 });
    }

    const supabase = createAdminClient() as any;
    const effectivePaymentId = paymentId || `sim_pay_${Date.now()}`;

    // If simulation is requested or in development mode
    if (simulateSuccess && supabase) {
      // Find the order
      let query = supabase.from('orders').select('id, order_number, status, total_inr');
      if (orderId) {
        query = query.or(`id.eq.${orderId},order_number.eq.${orderId}`);
      } else if (orderNumber) {
        query = query.eq('order_number', orderNumber);
      }

      const { data: order } = await query.maybeSingle();

      if (order && order.status !== 'paid') {
        const { error: rpcErr } = await supabase.rpc('decrement_stock_for_order', {
          p_order_id: order.id,
          p_cf_payment_id: effectivePaymentId,
        });

        if (rpcErr) {
          await supabase
            .from('orders')
            .update({
              status: 'paid',
              cashfree_payment_id: effectivePaymentId,
              paid_at: new Date().toISOString(),
            })
            .eq('id', order.id);

          const { data: items } = await supabase
            .from('order_items')
            .select('variant_id, quantity')
            .eq('order_id', order.id);

          if (items) {
            for (const item of items) {
              if (item.variant_id) {
                const { data: variant } = await supabase
                  .from('product_variants')
                  .select('stock')
                  .eq('id', item.variant_id)
                  .single();

                if (variant) {
                  const newStock = Math.max(0, variant.stock - item.quantity);
                  await supabase
                    .from('product_variants')
                    .update({ stock: newStock })
                    .eq('id', item.variant_id);
                }
              }
            }
          }
        }

        return NextResponse.json({
          success: true,
          status: 'paid',
          orderNumber: order.order_number,
          paymentId: effectivePaymentId,
        });
      }

      return NextResponse.json({
        success: true,
        status: order?.status || 'paid',
        orderNumber: order?.order_number || orderNumber,
        paymentId: effectivePaymentId,
      });
    }

    // Default status query
    if (supabase) {
      let query = supabase.from('orders').select('id, order_number, status, total_inr, paid_at, cashfree_payment_id');
      if (orderId) {
        query = query.or(`id.eq.${orderId},order_number.eq.${orderId}`);
      } else {
        query = query.eq('order_number', orderNumber);
      }

      const { data: order } = await query.maybeSingle();
      if (order) {
        return NextResponse.json({
          success: true,
          status: order.status,
          orderNumber: order.order_number,
          paidAt: order.paid_at,
          paymentId: order.cashfree_payment_id,
        });
      }
    }

    return NextResponse.json({
      success: true,
      status: 'pending',
      orderNumber,
    });
  } catch (err: any) {
    console.error('[checkout/verify-payment] Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
