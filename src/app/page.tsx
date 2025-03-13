import { Home } from '@/app/(index)/ui/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discover Artists › dotcreators',
};

export default function HomePage() {
  return <Home />;
}
