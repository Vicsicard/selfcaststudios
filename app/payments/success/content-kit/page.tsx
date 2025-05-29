'use client'

import React, { useState, useEffect } from 'react'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'
import { useSearchParams } from 'next/navigation'
import { Playfair_Display } from 'next/font/google'
import Link from 'next/link'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function ContentKitSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [orderDetails, setOrderDetails] = useState({
    productName: 'Content Starter Kit',
    price: '$299',
    deliveryTime: '5 business days',
    nextProduct: 'Brand Website',
    nextProductPrice: '$999',
    nextProductLink: '/products/website'
  })
  
  useEffect(() => {
    // Track purchase conversion with Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        content_name: 'content_kit',
        currency: 'USD',
        value: 299.00
      });
    }
    
    // Verify the payment with the marketing automation system
    const verifyPayment = async () => {
      if (!sessionId) {
        setError('Missing session ID');
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            session_id: sessionId,
            client_id: searchParams.get('client_id') || 'cherry-rich', // Default to cherry-rich for testing
            product_type: 'content_kit'
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Payment verification failed:', errorData);
          setError('Failed to verify payment. Please contact support.');
        } else {
          const data = await response.json();
          console.log('Payment verified successfully:', data);
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setError('An error occurred while verifying your payment. Please contact support.');
      } finally {
        setLoading(false);
      }
    };
    
    // Verify payment after a short delay to show loading state
    const timer = setTimeout(() => {
      verifyPayment();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [sessionId, searchParams])
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-surface-dark">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-surface-darker opacity-45" />
      
      <div className={`container mx-auto px-4 py-20 relative z-10 ${playfair.className}`}>
        <div className="max-w-3xl mx-auto bg-white rounded-custom p-8 shadow-lg">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-6"></div>
              <h2 className="text-2xl font-semibold text-primary">Processing your order...</h2>
              <p className="text-light mt-2">Please wait while we confirm your payment</p>
            </div>
          ) : (
            <>
              {error ? (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-custom p-4 mb-8">
                  <h3 className="text-lg font-semibold mb-2">Error</h3>
                  <p>{error}</p>
                  <p className="mt-2 text-sm">If this problem persists, please contact support.</p>
                </div>
              ) : null}
              
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-surface-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-primary">Content Kit Purchased!</h1>
                <p className="text-light text-lg mt-2">Thank you for elevating your professional presence</p>
              </div>
              
              <div className="border-t border-b border-surface-light py-6 my-6">
                <h2 className="text-xl font-semibold text-primary mb-4">Order Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-light">Product:</span>
                    <span className="font-medium text-primary">{orderDetails.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light">Price:</span>
                    <span className="font-medium text-primary">{orderDetails.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light">Estimated Delivery:</span>
                    <span className="font-medium text-primary">Within {orderDetails.deliveryTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light">Order ID:</span>
                    <span className="font-medium text-primary">{sessionId?.substring(0, 14) || 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-primary mb-4">What's Included in Your Content Kit</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-accent mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Complete "About" Page:</strong> A professionally crafted narrative for your website or profile</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-accent mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Social Media Content:</strong> 3-4 platform-specific posts tailored to your voice</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-accent mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Quote Graphics:</strong> 2-3 visually appealing graphics featuring your key insights</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-accent mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Content Strategy Guide:</strong> Tips for maintaining your professional narrative</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-primary mb-4">What Happens Next?</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-accent mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Our content team will begin crafting your personalized content package.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-accent mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>You'll receive an email with your complete content kit within {orderDetails.deliveryTime}.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-accent mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>You'll have the opportunity to request revisions to ensure everything perfectly represents your brand.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-surface-light rounded-custom p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Ready for a complete digital presence?</h3>
                <p className="mb-4">Complete your professional brand with a custom-designed website that showcases your unique voice and expertise.</p>
                <div className="text-center">
                  <Link 
                    href={orderDetails.nextProductLink}
                    className="inline-block bg-accent hover:bg-accent-dark text-white font-medium py-3 px-6 rounded-custom transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Explore the Brand Website ({orderDetails.nextProductPrice})
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
