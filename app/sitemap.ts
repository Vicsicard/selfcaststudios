import { getBlogPosts } from '@/lib/blog'
import { MetadataRoute } from 'next'

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()
  const siteUrl = process.env.SITE_URL || 'https://selfcaststudios.com'
  
  // Generate entries for static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFreq,
      priority: 0.9,
    },
  ]

  // Generate entries for blog posts
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.created_at ? new Date(post.created_at) : new Date(),
    changeFrequency: 'weekly' as ChangeFreq,
    priority: 0.8,
  }))

  return [...staticPages, ...blogEntries]
}
