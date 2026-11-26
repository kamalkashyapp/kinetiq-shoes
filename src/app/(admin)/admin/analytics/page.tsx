import { Metadata } from 'next';
import { AdminAnalyticsClient } from './AdminAnalyticsClient';

export const metadata: Metadata = {
  title: 'Commerce Analytics & Funnel | KINETIQ Admin',
  description: 'First-party conversion funnel, session volume, and device attribution.',
};

export default function AdminAnalyticsPage() {
  return <AdminAnalyticsClient />;
}
