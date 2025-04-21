'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Playfair_Display } from 'next/font/google'
import styles from './styles.module.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function PaymentSuccessPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Short delay before redirecting to give users a moment to see the success message
    const redirectTimer = setTimeout(() => {
      router.push('/onboarding');
    }, 3000);
    
    return () => clearTimeout(redirectTimer);
  }, [router]);
  
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
        <div className={styles.successCard}>
          <div className={styles.checkmark}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="38" stroke="#4CAF50" strokeWidth="4"/>
              <path d="M25 40L35 50L55 30" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>Payment Successful!</h1>
          <p>Thank you for subscribing to our Core Visibility Package.</p>
          <p>You'll be redirected to our onboarding form in a moment...</p>
        </div>
      </div>
    </div>
  )
}
