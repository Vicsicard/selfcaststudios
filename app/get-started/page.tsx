'use client'

import React from 'react'
import styles from './styles.module.css'
import { Metadata } from 'next'
import Head from 'next/head'

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
      <div className="relative z-10 min-h-screen">
        <div className={styles.page}>
          <header className={styles.header}>
            <h1>The Core Visibility Package</h1>
            <p className={styles.gradientText}>Your Story. Your Voice. <span style={{ fontWeight: 700 }}>Cast with Intention.</span></p>
          </header>

          <section className={styles.section}>
            <h2>Why Self Cast?</h2>
            <p>We believe your story deserves to be seen, heard, and trusted. Most people build their personal brand from the outside in. At Self Cast, we build from the inside out—starting with your truth.</p>
            <ul>
              <li>Real human interviews</li>
              <li>Custom content based on your lived experience</li>
              <li>High-trust visibility, not just empty exposure</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>What You Get</h2>
            <ul>
              <li>4 Blog Posts</li>
              <li>4 Social Media Posts (Instagram, Facebook, X, LinkedIn)</li>
              <li>1 Custom Bio/About Page</li>
              <li>3 Branded Quote Graphics</li>
              <li>A Fully Built Personal Brand Website</li>
            </ul>
            <p>All content is crafted directly from your 60-minute recorded workshop interview.</p>
          </section>

          <section className={styles.section}>
            <h2>The Self Cast Workshop Interview</h2>
            <p><strong>Where your story begins.</strong></p>
            <p>At Self Cast, we don't start with forms or formulas—we start with you. The Workshop Interview is a 60-minute, human-first conversation where we listen deeply to your story, your values, and your lived experience. We don't just gather facts—we uncover the voice behind them.</p>
            <p>From this one conversation, we build your entire visibility system: your bio, your blogs, your social presence, your site's tone and rhythm.</p>
            <div className={styles.highlight}>
              <p>It's not content pulled from a template. It's content shaped from your truth.</p>
            </div>
            <p>This is the heartbeat of Self Cast—and the reason our work resonates.</p>
          </section>

          <section className={styles.section}>
            <h2>Platform-Specific Social Media</h2>
            <p>We don't copy-paste across platforms. You get 1 tailored post per platform every month—each crafted to perform and resonate where it lands:</p>
            <ul>
              <li>Instagram (visual + quote-based)</li>
              <li>LinkedIn (professional insights)</li>
              <li>Twitter/X (punchy, direct thoughts)</li>
              <li>Facebook (connection-driven storytelling)</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Your Personal Brand Website</h2>
            <p>Your own digital home—built to express your essence:</p>
            <ul>
              <li>Mobile-friendly and SEO-optimized</li>
              <li>Blog and social post integration</li>
              <li>Editable backend</li>
              <li>Fully branded layout with your colors, fonts, and tone</li>
              <li>Hosting and domain setup support included</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Why It Works</h2>
            <p>We don't guess. We listen. Every word, image, and design element comes from your story—not a stock template.</p>
            <div className={styles.highlight}>
              <p>You're not just getting content. You're building a high-trust narrative system that works across platforms.</p>
            </div>
          </section>

          <section className={`${styles.section} ${styles.pricingCta}`}>
            <h2>Start Your Visibility Journey</h2>
            <p className={styles.subheadline}>One story. One system. Endless resonance.</p>

            <div className={styles.pricingCard}>
              <h3>Core Visibility Package</h3>
              <p className={styles.price}>$2,000<span>/month</span></p>
              <ul className={styles.features}>
                <li>60-min storytelling workshop</li>
                <li>4 blog posts (SEO-optimized)</li>
                <li>4 platform-specific social posts</li>
                <li>Custom bio & 3 branded quotes</li>
                <li>Fully built personal brand website</li>
              </ul>

              <p className={styles.secureLabel}>🔒 Payment secured via Stripe</p>
              <a href="https://buy.stripe.com/eVa7u55rN4xybe06oD" target="_blank" className={styles.subscribeBtn}>
                Book a Private Consultation
              </a>

              <p className={styles.note}>We onboard a limited number of clients each month to ensure creative quality and attention.</p>
            </div>
          </section>

          <section className={styles.footerCard}>
            <p className={styles.tagline}>We'll handle everything—from interview to visibility. You just show up with your story.</p>
            <p className={styles.copyright}>© 2025 <a href="https://www.selfcaststudios.com/" target="_blank">Self Cast Studios</a>. All rights reserved.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
