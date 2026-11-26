import { Metadata } from 'next';
import { CheckoutClient } from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Secure Checkout | KINETIQ',
  description: 'Complete your order with Cashfree secure payment processing.',
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
