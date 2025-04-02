import { getBlogPosts } from '@/lib/blog'

export async function GET(): Promise<Response> {
  const posts = await getBlogPosts()
  
  // Generate entries for static pages
  const staticPages = [
    {
      url: 'https://selfcaststudios.com',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://selfcaststudios.com/blog',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // Generate entries for blog posts
  const blogEntries = posts.map((post) => ({
    url: `https://selfcaststudios.com/blog/${post.slug}`,
    lastModified: post.created_at ? new Date(post.created_at).toISOString() : new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Combine all entries
  const entries = [...staticPages, ...blogEntries]

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${entries.map((entry) => `
        <url>
          <loc>${entry.url}</loc>
          <lastmod>${entry.lastModified}</lastmod>
          <changefreq>${entry.changeFrequency}</changefreq>
          <priority>${entry.priority}</priority>
        </url>
      `).join('')}
    </urlset>`

  // Return XML with proper content type
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600',
    },
  })
}
