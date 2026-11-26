import { Metadata } from 'next';
import { WishlistClient } from './WishlistClient';

export const metadata: Metadata = {
  title: 'Reserved Wishlist | KINETIQ Account',
  description: 'Your saved high-performance silhouettes and reserved editions.',
};

export default function AccountWishlistPage() {
  return <WishlistClient />;
}
