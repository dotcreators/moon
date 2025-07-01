/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://dotcreators.xyz',
  changefreq: 'monthly',
  priority: 0.7,
  generateRobotsTxt: true,
  exclude: ['/404', '/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.SITE_URL}/server-sitemap.xml`],
  },
  transform: async (config, path) => {
    const lastmod = config.autoLastmod ? new Date().toISOString() : undefined;
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 1,
      lastmod,
    };
  },
};
