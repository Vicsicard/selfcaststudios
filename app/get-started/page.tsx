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
      (window as any).fbq('track', 'InitiateCheckout', {content_name: 'free_workshop'});
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
          {/* Hero Section */}
          <div className={styles.header}>
            <h1 className={styles.title}>Your Story. Your Voice. Start Here.</h1>
            <p className={styles.tagline}>One free conversation. One clear direction.</p>
            <p style={{
              fontSize: '1.2rem', 
              fontWeight: 500,
              color: '#444',
              marginBottom: '1.5rem'
            }}>Book your personalized Self Cast Workshop and uncover the message that moves your brand forward.</p>

            {/* Above-the-fold CTA */}
            <div className={styles.aboveFoldCta} style={{textAlign: 'center', marginBottom: '2rem'}}>
              <a 
                href="https://buy.stripe.com/dRmcN53TS94l2e884Ccwg0i" 
                target="_blank"
                className={styles.subscribeBtn}
                onClick={handleGetStartedClick}
              >
                Get Started – Book Your Free Workshop
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
            <p className={styles.text}>We don't build your brand from trends. We build it from your truth.</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Everything we create begins with a real, human conversation.</li>
              <li className={styles.listItem}>Sarah (your intelligent guide) helps you reflect, speak clearly, and articulate what makes your story matter.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>What Is the Self Cast Workshop?</h2>
            <p className={styles.text}>The Self Cast Workshop is a 1:1 recorded interview guided by Sarah—our intelligent storytelling assistant trained to help you articulate your voice and purpose.</p>
            <p className={styles.text}>In this free session, you'll:</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Reflect on your journey and professional story</li>
              <li className={styles.listItem}>Gain clarity on what makes your message meaningful</li>
              <li className={styles.listItem}>Walk away with a personalized summary of what Sarah heard in your words</li>
            </ul>
            <p className={styles.text}>You don't need to prepare. Just show up. Sarah will handle the rest.</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>What Happens After?</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>You'll receive a custom narrative summary based on your workshop.</li>
              <li className={styles.listItem}>If it resonates, you can upgrade—starting with a $29 short bio.</li>
              <li className={styles.listItem}>You'll always know what's next—but you'll never feel pressured.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Who This Is For</h2>
            <p className={styles.text}>Whether you're:</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Starting a business</li>
              <li className={styles.listItem}>Reclaiming your voice after a setback</li>
              <li className={styles.listItem}>Changing careers</li>
              <li className={styles.listItem}>Building a reputation as a thought leader</li>
              <li className={styles.listItem}>Or just trying to show up more authentically online...</li>
            </ul>
            <p className={styles.text}>This is where your visibility journey begins.</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Ready to Start?</h2>
            <p className={styles.text}>We onboard a limited number of clients each month to ensure personal attention and creative quality.</p>
            <div className={styles.aboveFoldCta} style={{textAlign: 'center', marginTop: '1.5rem'}}>
              <a 
                href="https://buy.stripe.com/dRmcN53TS94l2e884Ccwg0i" 
                target="_blank"
                className={styles.subscribeBtn}
                onClick={handleGetStartedClick}
              >
                Get Started – Book Your Free Workshop
              </a>
            </div>
            <p className={styles.text} style={{marginTop: '1.5rem', fontStyle: 'italic'}}>
              <strong>Private. Human. Commitment-Free.</strong><br/>
              Your session is confidential. There's no charge to book.
              You simply show up and share your story—we'll guide the rest.
            </p>
          </div>

          {/* FAQ Section */}
          <div className={styles.faqSection} style={{margin: '3rem auto 2rem auto', maxWidth: '700px', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.10)', padding: '2rem'}}>
            <h2 className={styles.sectionTitle} style={{textAlign: 'center', marginBottom: '1.5rem'}}>Frequently Asked Questions</h2>
            <div className={styles.faqItem} style={{marginBottom: '1.25rem'}} onClick={handleFAQInteraction}>
              <strong>How does the Self Cast workshop work?</strong>
              <p>It's a recorded, 1:1 conversation guided by Sarah—our intelligent story assistant. She'll ask thoughtful, personalized questions designed to help you explore your voice, values, and message. No preparation needed. Just show up and speak your truth.</p>
            </div>
            <div className={styles.faqItem} style={{marginBottom: '1.25rem'}} onClick={handleFAQInteraction}>
              <strong>Is this right for me?</strong>
              <p>Yes—if you want to:</p>
              <ul style={{paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc'}}>
                <li>Clarify your story or personal brand</li>
                <li>Show up more confidently online</li>
                <li>Create meaningful, authentic content</li>
                <li>Reclaim your voice during a career or life transition</li>
              </ul>
              <p style={{marginTop: '0.5rem'}}>We work with professionals, creatives, consultants, and entrepreneurs at all stages of visibility.</p>
            </div>
            <div className={styles.faqItem} style={{marginBottom: '1.25rem'}} onClick={handleFAQInteraction}>
              <strong>What happens after I click "Get Started"?</strong>
              <p>You'll fill out a brief onboarding form and receive a private phone number or link to book your free workshop session. It's quick, simple, and completely secure.</p>
            </div>
            <div className={styles.faqItem} style={{marginBottom: '1.25rem'}} onClick={handleFAQInteraction}>
              <strong>Is the workshop really free?</strong>
              <p>Yes. There's no cost to book your session, and no pressure to buy anything afterward.</p>
            </div>
            <div className={styles.faqItem} onClick={handleFAQInteraction}>
              <strong>What happens after the workshop?</strong>
              <p>You'll receive a personalized summary based on what Sarah heard during your conversation. From there, you can choose to unlock additional content—like posts, quotes, or a full personal brand site—at your own pace.</p>
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
              }}>Ready to find your authentic voice and transform your digital presence?</p>
              <a 
                href="https://buy.stripe.com/dRmcN53TS94l2e884Ccwg0i" 
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
              }}>Book your free workshop today</p>
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
            <p className={styles.footerTagline}>We'll handle everything—from interview to visibility. You just show up with your story.</p>
            <p className={styles.copyright}> 2025 <a href="https://www.selfcaststudios.com/" target="_blank" className={styles.link}>Self Cast Studios</a>. All rights reserved.</p>
          </div>

          {/* FAQ Section */}
          <div className={styles.faqSection} style={{margin: '3rem auto 2rem auto', maxWidth: '700px', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.10)', padding: '2rem'}}>
            <h2 className={styles.sectionTitle} style={{textAlign: 'center', marginBottom: '1.5rem'}}>Frequently Asked Questions</h2>
            <div className={styles.faqItem} style={{marginBottom: '1.25rem'}} onClick={handleFAQInteraction}>
              <strong>How does the Self Cast workshop work?</strong>
              <p>Our process starts with a 60-minute recorded interview, where we get to know your story and goals. From that single conversation, we create your website, blog posts, and social content—so you don't have to fill out endless forms or questionnaires.</p>
            </div>
            <div className={styles.faqItem} style={{marginBottom: '1.25rem'}} onClick={handleFAQInteraction}>
              <strong>Is this package right for me?</strong>
              <p>If you want a professional online presence built from your authentic story—and you're ready to stand out in your field—this package is for you. We work with executives, consultants, coaches, and anyone seeking to elevate their personal brand.</p>
            </div>
            <div className={styles.faqItem} style={{marginBottom: '1.25rem'}} onClick={handleFAQInteraction}>
              <strong>What happens after I click "Get Started"?</strong>
              <p>You'll be securely taken to our payment page. Once complete, you'll get immediate access to book your workshop interview and start the onboarding process.</p>
            </div>
            <div className={styles.faqItem} onClick={handleFAQInteraction}>
              <strong>How long does it take to receive my content?</strong>
              <p>Most clients receive their complete digital presence—including website, blog, and social posts—within 2–3 weeks of their workshop interview.</p>
            </div>
            
            <div className={styles.faqItem} style={{marginBottom: '1.25rem'}} onClick={handleFAQInteraction}>
              <strong>How long will my website be hosted?</strong>
              <p>Your Core Visibility Package includes 12 months of website hosting on our Self Cast platform. After the initial 12-month period, you can continue hosting your site for a nominal annual fee. We'll notify you before your included hosting period expires to ensure a seamless renewal process if you choose to continue.</p>
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
                href="https://buy.stripe.com/dRmcN53TS94l2e884Ccwg0i" 
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
