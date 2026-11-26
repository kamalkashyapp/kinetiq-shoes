import { Metadata } from 'next';
import { AdminProductsClient } from './AdminProductsClient';

export const metadata: Metadata = {
  title: 'Products & Inventory | KINETIQ Admin',
  description: 'Manage footwear silhouettes, variant matrix, and stock allocations.',
};

export default function AdminProductsPage() {
  return <AdminProductsClient />;
}
