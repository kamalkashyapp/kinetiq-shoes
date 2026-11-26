import { Metadata } from 'next';
import { OrdersClient } from './OrdersClient';

export const metadata: Metadata = {
  title: 'Order History | KINETIQ Account',
  description: 'View your previous sneaker dispatches, carrier tracking, and tax invoices.',
};

export default function AccountOrdersPage() {
  return <OrdersClient />;
}
