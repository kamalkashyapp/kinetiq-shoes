import { Metadata } from 'next';
import { CartPageClient } from './CartPageClient';

export const metadata: Metadata = {
  title: 'Shopping Bag | KINETIQ',
  description: 'Review your selected footwear, accessories, and prepare for secure checkout.',
};

export default function CartPage() {
  return <CartPageClient />;
}
