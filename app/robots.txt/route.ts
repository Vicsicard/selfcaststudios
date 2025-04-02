import { NextResponse } from 'next/server'
 
export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://selfcaststudios.com/sitemap.xml`
 
  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}
