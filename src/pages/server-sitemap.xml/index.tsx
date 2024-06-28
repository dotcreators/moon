import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ctx => {
  let fields: any = [];

  try {
    const response = await fetch(`${process.env.API_URL}/artists/usernames`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const usernames: string[] = await response.json();

      fields = usernames.map(username => ({
        loc: `https://dotcreators.com/artist/${username}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      }));
    } else {
      console.error(`Failed to fetch usernames. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching usernames:', error);
  }

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function Sitemap() {}
