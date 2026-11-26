import { Metadata } from 'next';
import { AdminSettingsClient } from './AdminSettingsClient';

export const metadata: Metadata = {
  title: 'Store Settings | KINETIQ Admin',
  description: 'Configure shipping thresholds, statutory taxation, and payment gateway parameters.',
};

export default function AdminSettingsPage() {
  return <AdminSettingsClient />;
}
