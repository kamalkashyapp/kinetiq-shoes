import { Metadata } from 'next';
import { AdminReviewsClient } from './AdminReviewsClient';

export const metadata: Metadata = {
  title: 'Reviews Moderation | KINETIQ Admin',
  description: 'Moderate customer and verified athlete footwear feedback and reviews.',
};

export default function AdminReviewsPage() {
  return <AdminReviewsClient />;
}
