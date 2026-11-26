import { Metadata } from 'next';
import { OrderTrackingClient } from './OrderTrackingClient';

export const metadata: Metadata = {
  title: 'Shipment Tracking | KINETIQ',
  description: 'Live carrier tracking and status updates for your KINETIQ order.',
};

interface TrackPageProps {
  params: {
    id: string;
  };
}

export default function TrackPage({ params }: TrackPageProps) {
  return <OrderTrackingClient orderId={params.id} />;
}
