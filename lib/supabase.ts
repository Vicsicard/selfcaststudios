import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_BLOG_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_BLOG_SUPABASE_ANON_KEY!

export interface BlogPost {
  id: string
  title: string
  content: string
  tags: string | null
  created_at: string | null
  images: string[] | null
  slug: string
}

export interface BlogPostWithHtml extends BlogPost {
  content_html: string
}

export const supabase = createClient(supabaseUrl, supabaseKey)
