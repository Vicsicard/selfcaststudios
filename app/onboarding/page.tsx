'use client'

import React from 'react'
import Script from 'next/script'
import { Playfair_Display } from 'next/font/google'
import styles from './styles.module.css'
import DirectSupabaseForm from './DirectSupabaseForm'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function OnboardingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: 'url("https://imagestopost.carrd.co/assets/images/image05.jpg?v=773739fd")',
          filter: 'brightness(0.85)'
        }}
      />
      
      <div className={`${styles.container} ${playfair.className} relative z-10`}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Client Onboarding</h1>
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <DirectSupabaseForm />
          </div>
        </div>
      </div>
    </div>
  )
}
