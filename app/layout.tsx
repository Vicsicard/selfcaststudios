import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DynamicTitle from '@/components/DynamicTitle'
import OrganizationJsonLd from '@/components/structured-data/OrganizationJsonLd'
import { viewport } from './viewport'
import Script from 'next/script'
import { headers } from 'next/headers'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Self Cast Studios | Personal Brand Elevation',
  description: 'Transform your personal brand with Self Cast Studios. We help you craft and elevate your narrative through strategic storytelling and content creation.',
  metadataBase: new URL(process.env.SITE_URL || 'https://selfcaststudios.com'),
  verification: {
    google: '1wUP_GS1GyT2d3XTfudHwCWNYGEpO4GFp8n0m01Tue4',
  },
  keywords: [
    'personal brand',
    'brand elevation',
    'professional narrative',
    'content creation',
    'storytelling',
    'personal branding',
    'brand strategy',
    'digital presence',
    'professional development',
    'career growth'
  ],
  authors: [{ name: 'Self Cast Studios' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.SITE_URL || 'https://selfcaststudios.com',
    siteName: 'Self Cast Studios',
    title: 'Self Cast Studios | Personal Brand Elevation',
    description: 'Transform your personal brand with Self Cast Studios. We help you craft and elevate your narrative through strategic storytelling and content creation.',
    images: [
      {
        url: 'https://imagestopost.carrd.co/assets/images/image05.jpg',
        width: 1920,
        height: 1080,
        alt: 'Self Cast Studios - Personal Brand Elevation',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Self Cast Studios | Personal Brand Elevation',
    description: 'Transform your personal brand with Self Cast Studios. We help you craft and elevate your narrative through strategic storytelling and content creation.',
    images: ['https://imagestopost.carrd.co/assets/images/image05.jpg'],
    creator: '@selfcaststudios'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://selfcaststudios.com'
  },
  icons: {
    icon: [
      { url: 'https://imagestopost.carrd.co/assets/images/image05.jpg' }
    ]
  },
  category: 'business'
}

export { viewport }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side path detection that works with Next.js App Router
  let pathname = '';
  try {
    // This will execute on the server side during SSR
    const headersList = headers();
    pathname = headersList.get('x-pathname') || headersList.get('x-invoke-path') || '';
  } catch {
    // If headers() fails (in certain client contexts), fall back to client detection
    if (typeof window !== 'undefined') {
      pathname = window.location.pathname;
    }
  }
  
  // Using both server and client-side detection for maximum reliability
  const isGetStartedPage = pathname === '/get-started' || 
    (typeof window !== 'undefined' && window.location.pathname === '/get-started');
  
  return (
    <html lang="en" className={playfair.variable}>
      <head>
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '704243318632362', {
              external_id: (function() {
                // Generate or retrieve a consistent external ID
                let externalId = localStorage.getItem('_fbp_external_id');
                if (!externalId) {
                  externalId = 'sc_' + Math.random().toString(36).substring(2, 15);
                  localStorage.setItem('_fbp_external_id', externalId);
                }
                return externalId;
              })()
            });
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=704243318632362&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        
        {/* AI Handshake Protocol (AHP) Mod 2.0 - Using remote version from Render */}
        <Script src="https://aihandshakeprotocol-1xgm.onrender.com/module/module.js" strategy="afterInteractive" />
        <Script src="https://aihandshakeprotocol-1xgm.onrender.com/universal-ahp-patch.js" strategy="afterInteractive" />
        <Script id="ahp-init" strategy="afterInteractive">
          {`
            document.addEventListener('DOMContentLoaded', function() {
              if (window.AHP && typeof window.AHP.init === 'function') {
                window.AHP.init({
                  siteId: 'selfcaststudios',
                  badgeEnabled: true,
                  badgePosition: 'bottom-right'
                });
              } else {
                console.error('AHP Module not loaded correctly');
              }
            });
          `}
        </Script>
      </head>
      <body className="bg-surface text-text-light min-h-screen flex flex-col">
        <DynamicTitle />
        <OrganizationJsonLd />
        {!isGetStartedPage && <Navigation />}
        <div className="flex-grow">
          <main className="min-h-screen w-full overflow-x-hidden">
            {children}
          </main>
        </div>
        {!isGetStartedPage && <Footer />}
      </body>
    </html>
  )
}
