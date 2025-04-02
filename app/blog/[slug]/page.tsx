import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPostBySlug, processPostContent, generateStructuredData } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ShareButton } from '../components/ShareButton'
import BlogPostJsonLd from '@/components/structured-data/BlogPostJsonLd'
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Self Cast Studios',
      description: 'The requested blog post could not be found.'
    }
  }

  let firstImageUrl = null;
  try {
    if (Array.isArray(post.images) && post.images.length > 0) {
      const firstImageData = JSON.parse(post.images[0]);
      if (firstImageData?.url) {
        firstImageUrl = firstImageData.url;
      }
    }
  } catch (e) {
    console.error('Error parsing image data:', e);
  }

  return {
    title: `${post.title} | Self Cast Studios Blog`,
    description: post.excerpt || post.content.slice(0, 160).replace(/[#*`]/g, '').trim() + '...',
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.slice(0, 160).replace(/[#*`]/g, '').trim() + '...',
      type: 'article',
      publishedTime: post.created_at || undefined,
      modifiedTime: post.updated_at || post.created_at || undefined,
      images: firstImageUrl ? [
        {
          url: firstImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
      url: `https://selfcaststudios.com/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.content.slice(0, 160).replace(/[#*`]/g, '').trim() + '...',
      images: firstImageUrl ? [firstImageUrl] : [],
    }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const processedPost = await processPostContent(post)
  const structuredData = generateStructuredData(post)

  // Extract image URL from the JSON string
  let heroImageUrl = null;
  let heroImageAlt = '';
  
  try {
    if (Array.isArray(processedPost.images) && processedPost.images.length > 0) {
      const firstImageStr = processedPost.images[0];
      if (typeof firstImageStr === 'string') {
        const imageData = JSON.parse(firstImageStr);
        if (imageData?.url) {
          heroImageUrl = imageData.url;
          heroImageAlt = imageData.alt || '';
        }
      }
    }
  } catch (e) {
    console.error('Error parsing image data:', e);
  }

  const breadcrumbItems = [
    { name: 'Home', item: 'https://selfcaststudios.com' },
    { name: 'Blog', item: 'https://selfcaststudios.com/blog' },
    { name: post.title, item: `https://selfcaststudios.com/blog/${post.slug}` }
  ]

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${params.slug}`;

  const content = await processPostContent(post)
  const images = post.images ? JSON.parse(post.images[0]) : null

  return (
    <>
      <BlogPostJsonLd
        title={post.title}
        description={post.excerpt || post.title}
        images={images?.url ? [images.url] : []}
        url={`https://selfcaststudios.com/blog/${post.slug}`}
        datePublished={post.created_at || new Date().toISOString()}
        dateModified={post.updated_at || post.created_at || new Date().toISOString()}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <article className="min-h-screen bg-white">
        {/* Back to Blog Link */}
        <div className="absolute top-6 left-6 z-10">
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-black/30 backdrop-blur-md rounded-full hover:bg-black/40 transition-all hover:scale-105"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative h-[80vh] min-h-[700px] w-full">
          {heroImageUrl ? (
            <>
              <Image
                src={heroImageUrl}
                alt={heroImageAlt || processedPost.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
          )}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full max-w-[1400px] mx-auto px-6 pb-24">
              <div className="max-w-4xl">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                  {processedPost.title}
                </h1>
                {processedPost.created_at && (
                  <div className="text-gray-300 text-xl font-light tracking-wide">
                    {new Date(processedPost.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-[1400px] mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-lg prose-blockquote:not-italic prose-img:rounded-xl prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: processedPost.content_html }}
            />

            {/* Share Section */}
            <div className="mt-20 pt-10 border-t border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Share this article</h3>
              <div className="flex flex-wrap gap-4">
                <ShareButton
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(processedPost.title)}&url=${encodeURIComponent(shareUrl)}`}
                  platform="Twitter"
                  color="#1DA1F2"
                  hoverColor="#1a8cd8"
                />
                <ShareButton
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  platform="LinkedIn"
                  color="#0A66C2"
                  hoverColor="#094d92"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </article>
    </>
  )
}
