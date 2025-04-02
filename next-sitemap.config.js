/** @type {import('next-sitemap').IConfig} */
// Force cache invalidation - 2025-04-02
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://selfcaststudios.com',
  generateRobotsTxt: true,
  outDir: './public',
  exclude: ['/api/*', '/test-*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/test-*']
      },
    ],
  },
  transform: async (config, path) => {
    // Exclude test routes and API routes
    if (path.startsWith('/api/') || path.startsWith('/test-')) {
      return null;
    }
    
    // Higher priority for main pages
    const priority = path === '/' ? 1.0 :
      path.startsWith('/services/') ? 0.9 :
      path.startsWith('/blog/') ? 0.8 :
      0.7;

    return {
      loc: path,
      changefreq: 'daily',
      priority,
      lastmod: new Date().toISOString(),
    }
  }
}
