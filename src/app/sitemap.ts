import { $API } from '@/shared/utils/dotcreators-api';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let artistPaths: MetadataRoute.Sitemap = [];

  try {
    const d = await $API.getArtistUsernames();
    artistPaths = d.items.map(username => ({
      url: `${process.env.SITE_URL}/artists/${username}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      lastModified: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Failed to fetch artist usernames:', error);
  }

  const routes = ['', '/changelog', '/wiki'].map(route => ({
    url: `${process.env.SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...routes, ...artistPaths];
}
