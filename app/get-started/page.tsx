'use client'

import React from 'react'
import styles from './styles.module.css'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function GetStartedPage() {
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
            <p className={styles.text}>At Self Cast, we don't start with forms or formulas—we start with you. The Workshop Interview is a 60-minute, human-first conversation where we listen deeply to your story, your values, and your lived experience. We don't just gather facts—we uncover the voice behind them.</p>
            <p className={styles.text}>From this one conversation, we build your entire visibility system: your bio, your blogs, your social presence, your site's tone and rhythm.</p>
            <div className={styles.highlight}>
              <p className={styles.text}>It's not content pulled from a template. It's content shaped from your truth.</p>
            </div>
            <p className={styles.text}>This is the heartbeat of Self Cast—and the reason our work resonates.</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Platform-Specific Social Media</h2>
            <p className={styles.text}>We don't copy-paste across platforms. You get 4 tailored posts per platform every month—each crafted to perform and resonate where it lands:</p>
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
            <p className={styles.text}>We don't guess. We listen. Every word, image, and design element comes from your story—not a stock template.</p>
            <div className={styles.highlight}>
              <p className={styles.text}>You're not just getting content. You're building a high-trust narrative system that works across platforms.</p>
            </div>
          </div>

          <div className={styles.pricingSection}>
            <h2 className={styles.sectionTitle}>Start Your Visibility Journey</h2>
            <p className={styles.subheadline}>One story. One system. Endless resonance.</p>

            <div className={styles.pricingCard}>
              <h3 className={styles.cardTitle}>Core Visibility Package</h3>
              <p className={styles.price}>$2,000<span className={styles.pricePeriod}>/month</span></p>
              <ul className={styles.featuresList}>
                <li className={styles.featuresItem}>60-min storytelling workshop</li>
                <li className={styles.featuresItem}>4 blog posts (SEO-optimized, custom written)</li>
                <li className={styles.featuresItem}>16 platform-specific social posts (4 per platform)</li>
                <li className={styles.featuresItem}>Custom bio & 3 branded quotes</li>
                <li className={styles.featuresItem}>Personal brand website on Self Cast platform</li>
              </ul>

              <p className={styles.secureLabel}>🔒 Payment secured via Stripe</p>
              <a href="https://buy.stripe.com/eVa7u55rN4xybe06oD" target="_blank" className={styles.subscribeBtn}>
                Get Started
              </a>
              <p className={styles.note}>We onboard a limited number of clients each month to ensure creative quality and attention.</p>
            </div>
          </div>

          <div className={styles.footerCard}>
            <p className={styles.footerTagline}>We'll handle everything—from interview to visibility. You just show up with your story.</p>
            <p className={styles.copyright}> 2025 <a href="https://www.selfcaststudios.com/" target="_blank" className={styles.link}>Self Cast Studios</a>. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
