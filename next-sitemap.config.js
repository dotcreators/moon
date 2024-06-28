/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml', '/404'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.SITE_URL}/server-sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 1.0,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }

    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async (config) => {
    return [
      await config.transform(config, '/artists'),
      await config.transform(config, '/suggest'),
    ];
  },
};