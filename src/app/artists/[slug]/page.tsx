import { Metadata } from 'next';
import { ArtistSlug } from './ui/ArtistSlug';

export const metadata: Metadata = {
  title: ' › artists',
};

export default function ArtistSlugPage() {
  return <ArtistSlug />;
}
