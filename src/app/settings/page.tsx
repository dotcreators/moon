import { Metadata } from 'next';
import Settings from './ui/settings';

export const metadata: Metadata = {
  title: 'Settings › dotcreators',
};

export default function SettingsPage() {
  return <Settings />;
}
