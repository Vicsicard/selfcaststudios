/** @type {import('next-sitemap').IConfig} */
// Force cache invalidation - 2025-04-02
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://selfcaststudios.com',
  generateRobotsTxt: true,
  outDir: './public',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
