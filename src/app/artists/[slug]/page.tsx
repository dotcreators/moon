import { Metadata } from 'next';
import { ArtistSlug } from './ui/artist-slug';
import { $API } from '@/shared/utils/dotcreators-api';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const artist = await $API.getArtistProfileByUsername(params.slug);

    if (!artist) {
      return {
        title: 'Artist not found',
      };
    }

    const baseMetadata = {
      title: `${artist.name} › Artists`,
      openGraph: {
        title: `${artist.name}`,
        images: artist.images.avatar ?? undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${artist.name}`,
        images: artist.images.avatar ?? undefined,
      },
    };

    if (artist.bio) {
      return {
        ...baseMetadata,
        description: artist.bio,
        openGraph: {
          ...baseMetadata.openGraph,
          description: artist.bio,
        },
        twitter: {
          ...baseMetadata.twitter,
          description: artist.bio,
        },
      };
    }

    return baseMetadata;
  } catch {
    return {
      title: 'Artist Profile',
    };
  }
}

export default async function ArtistSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await $API.getArtistProfileByUsername(slug);
  if (!a) return 404;

  return <ArtistSlug data={a} />;
}
