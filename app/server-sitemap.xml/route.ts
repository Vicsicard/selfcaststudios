import { getBlogPosts } from '@/lib/blog'
import { MetadataRoute } from 'next'

export async function GET(): Promise<Response> {
  const posts = await getBlogPosts()
  
  const sitemap = posts.map((post) => ({
    url: `https://selfcaststudios.com/blog/${post.slug}`,
    lastModified: new Date(post.created_at || ''),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return new Response(JSON.stringify(sitemap), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
