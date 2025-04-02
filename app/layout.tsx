import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DynamicTitle from '@/components/DynamicTitle'
import OrganizationJsonLd from '@/components/structured-data/OrganizationJsonLd'

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${playfair.variable} font-playfair overflow-x-hidden bg-surface text-text-light min-h-screen flex flex-col`}>
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
