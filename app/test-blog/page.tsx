import { supabase } from '@/lib/supabase'

export default async function TestBlogPage() {
  // Get all posts without any filtering first
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')

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
      <h1 className="text-3xl font-bold mb-8">All Available Blog Posts</h1>
      <div className="space-y-8">
        {posts?.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{post.title || 'No Title'}</h2>
            <div className="mt-4">
              <strong>Tags:</strong> {post.tags || 'No tags'}
            </div>
            <div className="mt-2">
              <strong>Content Preview:</strong>
              <pre className="mt-2 p-4 bg-gray-100 rounded whitespace-pre-wrap">
                {post.content?.slice(0, 200)}...
              </pre>
            </div>
            <div className="mt-2">
              <strong>Raw Post Data:</strong>
              <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto">
                {JSON.stringify(post, null, 2)}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
