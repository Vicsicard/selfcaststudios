import { supabase } from '@/lib/supabase'
import Image from 'next/image'

export default async function TestPostsPage() {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Error loading posts</h1>
        <pre className="mt-4 p-4 bg-gray-100 rounded">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">All Blog Posts</h1>
      <div className="space-y-8">
        {posts?.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            {post.images && post.images.length > 0 && (
              <div className="relative h-48 mb-4">
                <Image
                  src={post.images[0]}
                  alt={post.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
            <div className="prose max-w-none mb-4">
              <div dangerouslySetInnerHTML={{ 
                __html: post.content.split('\n').slice(0, 3).join('\n') + '...'
              }} />
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>
                <strong>Tags:</strong> {post.tags || 'No tags'}
              </div>
              <div>
                <strong>Created:</strong> {post.created_at || 'No date'}
              </div>
            </div>
            {post.posted_on_site && (
              <div className="mt-2 text-sm text-gray-600">
                <strong>Posted on:</strong> {post.posted_on_site}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
