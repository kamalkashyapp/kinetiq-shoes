import { Metadata } from 'next';
import { AdminOrdersClient } from './AdminOrdersClient';

export const metadata: Metadata = {
  title: 'Orders & Dispatches | KINETIQ Admin',
  description: 'Manage customer orders, authoritative status transitions, and shipping logistics.',
};

export default function AdminOrdersPage() {
  return <AdminOrdersClient />;
}
