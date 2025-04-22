// Type declarations for Supabase client loaded from CDN
interface Window {
  supabase: {
    createClient: (url: string, key: string) => any;
  }
}
