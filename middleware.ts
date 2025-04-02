import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle robots.txt request
  if (request.nextUrl.pathname === '/robots.txt') {
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://selfcaststudios.com/sitemap.xml`

    return new NextResponse(robotsTxt, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/robots.txt'],
}
