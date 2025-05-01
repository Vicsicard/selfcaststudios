'use client'

import React from 'react'
import styles from './styles.module.css'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function GetStartedPage() {
  const handleGetStartedClick = () => {
    // Track Get Started form submission with Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {content_name: 'get_started'});
      (window as any).fbq('track', 'InitiateCheckout', {content_name: 'core_visibility_package'});
    }
  };

  // Video interaction tracking
  const handleVideoPlay = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'VideoPlay', {content_name: 'testimonial_video'});
    }
  };

  // FAQ engagement tracking
  const handleFAQInteraction = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'FAQEngagement', {content_name: 'get_started_page'});
    }
  };

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
      <div className="fixed inset-0 z-0 bg-black bg-opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen py-20">
        <div className={`${styles.page} ${playfair.className}`}>
          <div className={styles.header}>
            <h1 className={styles.title}>The Core Visibility Package</h1>
            <p className={styles.tagline}>Your Story. Your Voice. <span className={styles.bold}>Cast with Intention.</span></p>
            <p style={{
              fontSize: '1.2rem', 
              fontWeight: 500,
              color: '#444',
              marginBottom: '1.5rem'
            }}>Control Your Narrative. Build Your Authority. Amplify Your Voice.</p>

            {/* Above-the-fold CTA */}
            <div className={styles.aboveFoldCta} style={{textAlign: 'center', marginBottom: '2rem'}}>
              <a 
                href="https://buy.stripe.com/eVa7u55rN4xybe06oD" 
                target="_blank" 
                className={styles.subscribeBtn}
                onClick={handleGetStartedClick}
              >
                Get Started
              </a>
            </div>

            {/* Testimonial Video Section */}
            <div className={styles.testimonialSection} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem'}}>
              <video 
                controls 
                preload="metadata"
                onPlay={handleVideoPlay}
                style={{
                  maxWidth: '480px', 
                  width: '100%', 
                  borderRadius: '1rem', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                }}
              >
                <source src="/landing%20page%20testiomnial%201%20(1).mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className={styles.testimonialText} style={{marginTop: '1.25rem', maxWidth: '480px', fontStyle: 'italic', color: '#444'}}>
                <p>"Working with Self Cast Studios elevated my professional presence and opened doors to new opportunities I hadn't imagined possible."</p>
                <p style={{fontWeight: 600, marginTop: '0.5rem'}}>Michelle L.<br/><span style={{fontWeight: 400}}>Business Consultant</span></p>
              </div>
            </div>

          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Why Self Cast?</h2>
            <p className={styles.text}>We believe your story deserves to be seen, heard, and trusted. Most people build their personal brand from the outside in. At Self Cast, we build from the inside out—starting with your truth.</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Real human interviews</li>
              <li className={styles.listItem}>Custom content based on your lived experience</li>
              <li className={styles.listItem}>High-trust visibility, not just empty exposure</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>What You Get</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>4 Blog Posts (custom written from your workshop content)</li>
              <li className={styles.listItem}>16 Social Media Posts (4 unique posts each for Instagram, Facebook, X, LinkedIn)</li>
              <li className={styles.listItem}>1 Custom Bio/About Page (tailored to your authentic voice)</li>
              <li className={styles.listItem}>3 Branded Quote Graphics (with your key insights)</li>
              <li className={styles.listItem}>A Personal Brand Website on our Self Cast platform</li>
            </ul>
            <p className={styles.text}>All content is crafted directly from your 60-minute recorded workshop interview.</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>The Self Cast Workshop Interview</h2>
            <p className={styles.text}><strong>Where your story begins.</strong></p>
            <p className={styles.text}>At Self Cast, we don’t start with forms or formulas—we start with you. The Workshop Interview is a 60-minute, human-first conversation where we listen deeply to your story, your values, and your lived experience. We don’t just gather facts—we uncover the voice behind them.</p>
            <p className={styles.text}>From this one conversation, we build your entire visibility system: your bio, your blogs, your social presence, your site’s tone and rhythm.</p>
            <div className={styles.highlight}>
              <p className={styles.text}>It’s not content pulled from a template. It’s content shaped from your truth.</p>
            </div>
            <p className={styles.text}>This is the heartbeat of Self Cast—and the reason our work resonates.</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Platform-Specific Social Media</h2>
            <p className={styles.text}>We don’t copy-paste across platforms. Your Core Visibility Package includes 4 tailored posts per platform—each crafted to perform and resonate where it lands:</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Instagram (visual + quote-based)</li>
              <li className={styles.listItem}>LinkedIn (professional insights)</li>
              <li className={styles.listItem}>Twitter/X (punchy, direct thoughts)</li>
              <li className={styles.listItem}>Facebook (connection-driven storytelling)</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Your Personal Brand Website</h2>
            <p className={styles.text}>Your own digital home—built to express your essence:</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Mobile-friendly and SEO-optimized design</li>
              <li className={styles.listItem}>All your blog posts and social content displayed</li>
              <li className={styles.listItem}>User-friendly content editor</li>
              <li className={styles.listItem}>Fully branded layout with your colors, fonts, and tone</li>
              <li className={styles.listItem}>Hosted on our platform with your personalized Self Cast subdomain</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Why It Works</h2>
            <p className={styles.text}>We don’t guess. We listen. Every word, image, and design element comes from your story—not a stock template.</p>
            <div className={styles.highlight}>
              <p className={styles.text}>You’re not just getting content. You’re building a high-trust narrative system that works across platforms.</p>
            </div>
          </div>

          <div className={styles.pricingSection}>
            <h2 className={styles.sectionTitle}>Start Your Visibility Journey</h2>
            <p className={styles.subheadline}>One story. One system. Endless resonance.</p>

            <div className={styles.pricingCard}>
              <h3 className={styles.cardTitle}>Core Visibility Package</h3>
              <p className={styles.price}>$2,000</p>
              <ul className={styles.featuresList}>
                <li className={styles.featuresItem}>60-Min Workshop Interview</li>
                <li className={styles.featuresItem}>4 blog posts (SEO-optimized, custom written)</li>
                <li className={styles.featuresItem}>16 Social Posts Included (4 per platform)</li>
                <li className={styles.featuresItem}>Custom Bio & 3 Branded Quotes</li>
                <li className={styles.featuresItem}>Professional Brand Website</li>
              </ul>

              {/* Urgency badge */}
              <div style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ff9a8b 100%)',
                color: 'white',
                padding: '0.75rem clamp(0.5rem, 4vw, 1rem)',
                borderRadius: '2rem',
                fontWeight: 600,
                fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)',
                maxWidth: 'min(100%, fit-content)',
                margin: '0 auto 1.5rem auto',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
                textAlign: 'center'
              }}>
                <span style={{fontSize: '1.2rem'}}>⏱️</span> Only 3 Spots Left for May Onboarding
              </div>

              <p className={styles.secureLabel}>🔒 Payment secured via Stripe</p>
              <a 
                href="https://buy.stripe.com/eVa7u55rN4xybe06oD" 
                target="_blank" 
                className={styles.subscribeBtn}
                onClick={handleGetStartedClick}
              >
                Get Started
              </a>
              <p className={styles.note}>We onboard a limited number of clients each month to ensure creative quality and attention.</p>
            </div>
          </div>

          <div className={styles.carouselSection} style={{margin: '3rem auto 2rem auto', maxWidth: '1000px', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.10)', padding: '2rem 1rem'}}>
            <h2 className={styles.sectionTitle} style={{textAlign: 'center', marginBottom: '1.5rem'}}>See Real Client Results</h2>
            <div className={styles.carousel} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1.5rem', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '1rem', WebkitOverflowScrolling: 'touch', maxWidth: '100%', minHeight: '240px'}}>
              {[1,2,3,4,5,6].map(num => (
                <img
                  key={num}
                  src={`/carousel image ${num}.PNG`}
                  alt={`Sample website section ${num}`}
                  style={{
                    width: '280px',
                    height: 'auto',
                    borderRadius: '0.75rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                    objectFit: 'cover',
                    scrollSnapAlign: 'center',
                    background: '#f5f5f5',
                    flexShrink: 0
                  }}
                />
              ))}
            </div>
            <div style={{textAlign: 'center', fontSize: '1rem', color: '#666', marginTop: '1rem'}}>
              <em>Actual sections from recent Self Cast Studios client sites</em>
            </div>
          </div>

          <div className={styles.footerCard}>
            <p className={styles.footerTagline}>We’ll handle everything—from interview to visibility. You just show up with your story.</p>
            <p className={styles.copyright}> 2025 <a href="https://www.selfcaststudios.com/" target="_blank" className={styles.link}>Self Cast Studios</a>. All rights reserved.</p>
          </div>

          {/* FAQ Section */}
          <div className={styles.faqSection} style={{margin: '3rem auto 2rem auto', maxWidth: '700px', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.10)', padding: '2rem'}}>
            <h2 className={styles.sectionTitle} style={{textAlign: 'center', marginBottom: '1.5rem'}}>Frequently Asked Questions</h2>
            <div className={styles.faqItem} style={{marginBottom: '1.25rem'}} onClick={handleFAQInteraction}>
              <strong>How does the Self Cast workshop work?</strong>
              <p>Our process starts with a 60-minute recorded interview, where we get to know your story and goals. From that single conversation, we create your website, blog posts, and social content—so you don’t have to fill out endless forms or questionnaires.</p>
            </div>
            <div className={styles.faqItem} style={{marginBottom: '1.25rem'}} onClick={handleFAQInteraction}>
              <strong>Is this package right for me?</strong>
              <p>If you want a professional online presence built from your authentic story—and you’re ready to stand out in your field—this package is for you. We work with executives, consultants, coaches, and anyone seeking to elevate their personal brand.</p>
            </div>
            <div className={styles.faqItem} style={{marginBottom: '1.25rem'}} onClick={handleFAQInteraction}>
              <strong>What happens after I click “Get Started”?</strong>
              <p>You’ll be securely taken to our payment page. Once complete, you’ll get immediate access to book your workshop interview and start the onboarding process.</p>
            </div>
            <div className={styles.faqItem} onClick={handleFAQInteraction}>
              <strong>How long does it take to receive my content?</strong>
              <p>Most clients receive their complete digital presence—including website, blog, and social posts—within 2–3 weeks of their workshop interview.</p>
            </div>
            
            {/* Bottom CTA */}
            <div style={{
              textAlign: 'center',
              marginTop: '2.5rem',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              background: 'linear-gradient(to bottom, rgba(0,122,255,0.05), rgba(0,122,255,0.1))'
            }}>
              <p style={{
                fontSize: '1.1rem',
                fontWeight: 500,
                marginBottom: '1rem',
                color: '#333'
              }}>Ready to amplify your voice and transform your digital presence?</p>
              <a 
                href="https://buy.stripe.com/eVa7u55rN4xybe06oD" 
                target="_blank" 
                className={styles.subscribeBtn}
                onClick={handleGetStartedClick}
                style={{display: 'inline-block'}}
              >
                Get Started Now
              </a>
              <p style={{
                fontSize: '0.85rem',
                marginTop: '0.75rem',
                color: '#666'
              }}>Complete your brand transformation in less than 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
