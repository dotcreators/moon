import { $API } from '@/shared/utils/dotcreators-api';
import { getServerSideSitemap } from 'next-sitemap';

export async function GET(): Promise<Response> {
  const d = await $API.getArtistUsernames();
  const artistPaths = d.items.map(username => ({
    loc: `${process.env.SITE_URL}/artist/${username}`,
    changefreq: 'weekly' as const,
    priority: 0.7,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(artistPaths);
}
