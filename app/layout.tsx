import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DynamicTitle from '@/components/DynamicTitle'
import OrganizationJsonLd from '@/components/structured-data/OrganizationJsonLd'
import { viewport } from './viewport'

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
  return (
    <html lang="en" className={playfair.variable}>
      <body className="bg-surface text-text-light min-h-screen flex flex-col">
        <DynamicTitle />
        <OrganizationJsonLd />
        <Navigation />
        <div className="flex-grow">
          <main className="min-h-screen w-full overflow-x-hidden">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
