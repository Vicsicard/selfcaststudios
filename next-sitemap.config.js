/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://selfcaststudios.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://selfcaststudios.com/server-sitemap.xml',
    ],
  },
  exclude: ['/server-sitemap.xml'],
}
