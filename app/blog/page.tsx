import { supabase } from '@/lib/supabase'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Blog | Self Cast Studios',
  description: 'Latest insights and updates about personal branding and professional development from Self Cast Studios',
  openGraph: {
    title: 'Blog | Self Cast Studios',
    description: 'Latest insights and updates about personal branding and professional development from Self Cast Studios',
    type: 'website'
  }
}

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, content, created_at, images, tags, slug')
    .ilike('tags', '%selfcastgeneral%')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Error Loading Posts</h1>
        <p className="text-red-600">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Insights</h1>
      <div className="space-y-8">
        {posts?.map((post) => {
          let imageUrl = null;
          let imageAlt = '';
          
          try {
            if (Array.isArray(post.images) && post.images.length > 0) {
              const firstImageStr = post.images[0];
              if (typeof firstImageStr === 'string') {
                const imageData = JSON.parse(firstImageStr);
                if (imageData?.url) {
                  imageUrl = imageData.url;
                  imageAlt = imageData.alt || '';
                }
              }
            }
          } catch (e) {
            console.error('Error parsing image data for post ' + post.id + ':', e);
          }

          return (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.id}
              className="block"
            >
              <article className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 relative">
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={imageAlt || post.title || 'Blog post image'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 25vw"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <h2 className="text-2xl font-bold mb-3 text-gray-800 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <div className="prose max-w-none mb-4 text-gray-600">
                      {post.content.slice(0, 200)}
                      {post.content.length > 200 && '...'}
                    </div>
                    <span className="text-blue-600 hover:text-blue-800 transition-colors">Read more →</span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
        {!posts?.length && (
          <p className="text-gray-600">No posts available at the moment.</p>
        )}
      </div>
    </div>
  )
}
