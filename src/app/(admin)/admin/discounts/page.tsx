import { Metadata } from 'next';
import { AdminDiscountsClient } from './AdminDiscountsClient';

export const metadata: Metadata = {
  title: 'Discount Codes | KINETIQ Admin',
  description: 'Manage promotional coupons, minimum cart requirements, and percentage rules.',
};

export default function AdminDiscountsPage() {
  return <AdminDiscountsClient />;
}
