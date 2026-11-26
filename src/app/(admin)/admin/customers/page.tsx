import { Metadata } from 'next';
import { AdminCustomersClient } from './AdminCustomersClient';

export const metadata: Metadata = {
  title: 'Customers Database | KINETIQ Admin',
  description: 'Manage registered athletes, order volume, and lifetime value.',
};

export default function AdminCustomersPage() {
  return <AdminCustomersClient />;
}
