import { Metadata } from 'next';
import { SettingsClient } from './SettingsClient';

export const metadata: Metadata = {
  title: 'Preferences & Security | KINETIQ Account',
  description: 'Manage biometric footwear sizing, security credentials, and account settings.',
};

export default function AccountSettingsPage() {
  return <SettingsClient />;
}
