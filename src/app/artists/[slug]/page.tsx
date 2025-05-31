import { Metadata } from 'next';
import { ArtistSlug } from './ui/artist-slug';

export const metadata: Metadata = {
  title: ' › artists',
};

export default function ArtistSlugPage() {
  return <ArtistSlug />;
}
