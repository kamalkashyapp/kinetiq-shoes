import { Metadata } from 'next';
import { AddressesClient } from './AddressesClient';

export const metadata: Metadata = {
  title: 'Saved Addresses | KINETIQ Account',
  description: 'Manage domestic delivery destinations and default dispatch addresses.',
};

export default function AccountAddressesPage() {
  return <AddressesClient />;
}
