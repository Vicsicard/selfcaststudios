import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, images, tags')
    .ilike('tags', '%selfcastgeneral%')

  if (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Log the exact structure of each post
  posts?.forEach(post => {
    console.log('Post:', {
      id: post.id,
      title: post.title,
      images: post.images,
      imagesType: typeof post.images,
      tags: post.tags
    });
  });

  return NextResponse.json({
    posts,
    message: 'Check server console for detailed post structure'
  })
}
