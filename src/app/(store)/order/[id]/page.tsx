import { Metadata } from 'next';
import { OrderConfirmationClient } from './OrderConfirmationClient';

export const metadata: Metadata = {
  title: 'Order Confirmation | KINETIQ',
  description: 'Your KINETIQ order is confirmed and secured.',
};

interface OrderPageProps {
  params: {
    id: string;
  };
}

export default function OrderPage({ params }: OrderPageProps) {
  return <OrderConfirmationClient orderId={params.id} />;
}
