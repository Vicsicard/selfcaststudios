import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import rehypeImgSize from 'rehype-img-size'
import { supabase, BlogPost, BlogPostWithHtml } from './supabase'

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('tags', 'selfcastgeneral')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data || []
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('tags', 'selfcastgeneral')
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data
}

export async function convertMarkdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .use(rehypeImgSize, { dir: 'public' })
    .process(markdown)

  return result.toString()
}

export function generateStructuredData(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    articleBody: post.content,
    image: post.images?.[0],
    datePublished: post.created_at,
    dateModified: post.created_at,
    publisher: {
      '@type': 'Organization',
      name: 'Self Cast Studios',
      logo: {
        '@type': 'ImageObject',
        url: 'https://selfcaststudios.com/logo.png'
      }
    }
  }
}

export async function processPostContent(post: BlogPost): Promise<BlogPostWithHtml> {
  const contentHtml = await convertMarkdownToHtml(post.content)
  
  return {
    ...post,
    content_html: contentHtml
  }
}
