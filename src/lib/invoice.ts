// KINETIQ Brand Tax Invoice Engine
// Generates printable, high-density editorial invoice documents

export interface InvoiceItem {
  name: string;
  size: number;
  color: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface InvoiceData {
  orderNumber: string;
  invoiceDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  paymentId: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  grandTotal: number;
}

export function printOrderInvoice(invoice: InvoiceData) {
  if (typeof window === 'undefined') return;

  const invoiceWindow = window.open('', '_blank');
  if (!invoiceWindow) return;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>INVOICE — ${invoice.orderNumber} | KINETIQ</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace, sans-serif;
          background: #FFFFFF;
          color: #0B0B0C;
          padding: 40px;
          line-height: 1.4;
          font-size: 13px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #0B0B0C;
          padding-bottom: 24px;
          margin-bottom: 30px;
        }
        .brand { font-size: 32px; font-weight: 900; letter-spacing: -1.5px; }
        .tagline { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #8A867E; margin-top: 4px; }
        .invoice-title { text-align: right; }
        .invoice-title h1 { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; text-transform: uppercase; }
        .invoice-meta { font-family: monospace; font-size: 11px; color: #8A867E; margin-top: 6px; }
        .grid-2 { display: flex; justify-content: space-between; gap: 40px; margin-bottom: 30px; }
        .col { flex: 1; }
        .label { font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #8A867E; margin-bottom: 6px; }
        .val-bold { font-weight: 700; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th { text-align: left; padding: 10px 12px; border-bottom: 1px solid #0B0B0C; font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #8A867E; }
        td { padding: 12px; border-bottom: 1px solid #E5E3DD; font-size: 12px; }
        .total-box { margin-left: auto; width: 300px; font-family: monospace; font-size: 12px; }
        .total-row { display: flex; justify-content: space-between; padding: 6px 0; }
        .grand-total { border-top: 2px solid #0B0B0C; padding-top: 10px; font-size: 16px; font-weight: 900; color: #0B0B0C; }
        .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #E5E3DD; font-family: monospace; font-size: 10px; color: #8A867E; text-align: center; }
        @media print {
          body { padding: 0; }
          @page { margin: 15mm; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand">KINETIQ</div>
          <div class="tagline">WEIGHTLESS BY DESIGN · TECHNICAL FOOTWEAR</div>
          <div style="font-size: 11px; color: #8A867E; margin-top: 8px; font-family: monospace;">
            GSTIN: 29AAACK9411K1Z5 · HSN CODE: 64041190<br/>
            KINETIQ LABS INDIRANAGAR, BENGALURU, KA 560038
          </div>
        </div>
        <div class="invoice-title">
          <h1>TAX INVOICE</h1>
          <div class="invoice-meta">INVOICE: INV-${invoice.orderNumber}</div>
          <div class="invoice-meta">ORDER REF: ${invoice.orderNumber}</div>
          <div class="invoice-meta">DATE: ${invoice.invoiceDate}</div>
        </div>
      </div>

      <div class="grid-2">
        <div class="col">
          <div class="label">BILLED & SHIPPED TO:</div>
          <div class="val-bold">${invoice.customerName}</div>
          <div style="font-size: 12px; margin-top: 4px;">
            ${invoice.shippingAddress.line1}${invoice.shippingAddress.line2 ? `, ${invoice.shippingAddress.line2}` : ''}<br/>
            ${invoice.shippingAddress.city}, ${invoice.shippingAddress.state} — ${invoice.shippingAddress.pincode}<br/>
            INDIA · PHONE: ${invoice.customerPhone}<br/>
            EMAIL: ${invoice.customerEmail}
          </div>
        </div>

        <div class="col" style="text-align: right;">
          <div class="label">PAYMENT TELEMETRY:</div>
          <div class="val-bold">PAID VIA CASHFREE PG</div>
          <div style="font-size: 11px; font-family: monospace; color: #8A867E; margin-top: 4px;">
            GATEWAY REF: ${invoice.paymentId}<br/>
            CURRENCY: INR (₹) · 100% AUTHORIZED<br/>
            DISPATCH SERVICE: BLUEDART EXPRESS AIR
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ITEM & SPECIFICATION</th>
            <th>SIZE</th>
            <th>COLORWAY</th>
            <th style="text-align: center;">QTY</th>
            <th style="text-align: right;">UNIT PRICE</th>
            <th style="text-align: right;">AMOUNT (INR)</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map((i) => `
            <tr>
              <td><strong>${i.name}</strong></td>
              <td>US ${i.size}</td>
              <td>${i.color}</td>
              <td style="text-align: center;">${i.quantity}</td>
              <td style="text-align: right;">₹${i.unitPrice.toLocaleString('en-IN')}</td>
              <td style="text-align: right; font-weight: 700;">₹${i.totalPrice.toLocaleString('en-IN')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="total-box">
        <div class="total-row">
          <span>TAXABLE VALUE:</span>
          <span>₹${invoice.subtotal.toLocaleString('en-IN')}</span>
        </div>
        ${invoice.discount > 0 ? `
          <div class="total-row" style="color: #166534;">
            <span>PROMO DISCOUNT:</span>
            <span>-₹${invoice.discount.toLocaleString('en-IN')}</span>
          </div>
        ` : ''}
        <div class="total-row">
          <span>SHIPPING:</span>
          <span>${invoice.shipping === 0 ? 'COMPLIMENTARY' : `₹${invoice.shipping.toLocaleString('en-IN')}`}</span>
        </div>
        <div class="total-row">
          <span>IGST (18% INCLUDED):</span>
          <span>₹${invoice.tax.toLocaleString('en-IN')}</span>
        </div>
        <div class="total-row grand-total">
          <span>TOTAL DUE:</span>
          <span>₹${invoice.grandTotal.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div class="footer">
        THIS IS A COMPUTER-GENERATED TAX INVOICE AND REQUIRES NO PHYSICAL SIGNATURE.<br/>
        THANK YOU FOR JOINING THE KINETIQ RUN REVOLUTION. VISIT KINETIQ.DESIGN FOR WARRANTY & RECYCLING.
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  invoiceWindow.document.open();
  invoiceWindow.document.write(html);
  invoiceWindow.document.close();
}
