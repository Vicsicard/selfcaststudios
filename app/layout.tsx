'use client'

import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useTabTitle } from '@/hooks/useTabTitle'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Self Cast Studios | Personal Brand Elevation',
  description: 'Transform your personal brand with Self Cast Studios. We help you craft and elevate your narrative through strategic storytelling and content creation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Initialize the tab title animation
  useTabTitle([
    'Self Cast Studios',
    'Shape Your Narrative',
    'Transform Your Story',
    'Elevate Your Brand'
  ])

  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Self Cast Studios | Personal Brand Elevation</title>
        <meta name="description" content="Transform your personal brand with Self Cast Studios. We help you craft and elevate your narrative through strategic storytelling and content creation." />
      </head>
      <body className={`${playfair.variable} font-playfair overflow-x-hidden bg-surface text-text-light min-h-screen flex flex-col`}>
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
