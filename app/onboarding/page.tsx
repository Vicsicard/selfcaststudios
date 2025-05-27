'use client'

import React from 'react'
import Script from 'next/script'
import { Playfair_Display } from 'next/font/google'
import styles from './styles.module.css'

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
        <div className={styles.welcomeCard}>
          <h1>Your Story. Your Voice. Start Here.</h1>
          <p>You're in the right place to transform your personal brand with authentic storytelling.</p>
        </div>
        
        <div className={styles.section}>
          <h2>🎙️ What Is the Self Cast Workshop?</h2>
          <p>The Self Cast Workshop is a 1:1 recorded interview guided by Sarah—our intelligent storytelling assistant trained to help you articulate your voice and purpose.</p>
          <p>In this free session, you'll:</p>
          <ul className={styles.packageList}>
            <li>Reflect on your journey and professional story</li>
            <li>Gain clarity on what makes your message meaningful</li>
            <li>Walk away with a personalized summary of what Sarah heard in your words</li>
          </ul>
          <p>You don't need to prepare. Just show up. Sarah will handle the rest.</p>
        </div>
        
        <div className={styles.section}>
          <h2>🔁 What Happens After?</h2>
          <ul className={styles.packageList}>
            <li>You'll receive a custom narrative summary based on your workshop.</li>
            <li>If it resonates, you can upgrade—starting with a $29 short bio.</li>
            <li>You'll always know what's next—but you'll never feel pressured.</li>
          </ul>
        </div>
        
        <div className={styles.section}>
          <h2>👥 Who This Is For</h2>
          <p>Whether you're:</p>
          <ul className={styles.packageList}>
            <li>Starting a business</li>
            <li>Reclaiming your voice after a setback</li>
            <li>Changing careers</li>
            <li>Building a reputation as a thought leader</li>
            <li>Or just trying to show up more authentically online...</li>
          </ul>
          <p>This is where your visibility journey begins.</p>
        </div>
        
        <div className={styles.section}>
          <h2>✅ Ready to Start?</h2>
          <p>We onboard a limited number of clients each month to ensure personal attention and creative quality.</p>
          <div className={styles.ctaContainer} style={{textAlign: 'center', margin: '1.5rem 0'}}>
            <a 
              href="https://buy.stripe.com/dRmcN53TS94l2e884Ccwg0i"
              target="_blank"
              className={styles.ctaButton}
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#007AFF',
                color: 'white',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1.1rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              Get Started – Book Your Free Workshop
            </a>
          </div>
          <p style={{textAlign: 'center', fontStyle: 'italic', margin: '1rem 0'}}>
            <strong>🔒 Private. Human. Commitment-Free.</strong><br/>
            Your session is confidential. There's no charge to book.<br/>
            You simply show up and share your story—we'll guide the rest.
          </p>
        </div>
        
        <div className={styles.nextSteps}>
          <h2>Schedule Your Storytelling Workshop</h2>
          <p>Select a date and time that works for you. The workshop will last 60 minutes.</p>
        </div>
        
        <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formSection}>
            <div className={styles.calendarContainer}>
              {/* Calendly Embed */}
              <div className="calendly-inline-widget" data-url="https://calendly.com/vicsicard/30min" style={{minWidth: '320px', height: '700px'}}></div>
              <Script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async />
            </div>
            
            <div className={styles.questionnaireNote}>
              <p><strong>Note:</strong> Below you'll find our workshop questionnaire. This is just a preview of the types of questions we'll explore during our conversation. There's no need to fill these out in detail now—this is not a test! These questions are meant to help you start thinking about your personal brand story so our workshop can be relaxed, enjoyable, and productive.</p>
            </div>
          </div>
          
          <div className={styles.formSection}>
            <h3>Personal Information</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" required />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="contactMethod">Preferred Contact Method</label>
              <select id="contactMethod" name="contactMethod" required>
                <option value="">Select one...</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="text">Text Message</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="timezone">Your Time Zone</label>
              <select id="timezone" name="timezone" required>
                <option value="">Select one...</option>
                <option value="EST">Eastern Time (EST)</option>
                <option value="CST">Central Time (CST)</option>
                <option value="MST">Mountain Time (MST)</option>
                <option value="PST">Pacific Time (PST)</option>
                <option value="other">Other (please specify)</option>
              </select>
            </div>
          </div>
          
          <div className={styles.formSection}>
            <h3>Professional Background</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="profession">Current Profession/Industry</label>
              <input type="text" id="profession" name="profession" required />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="title">Professional Title/Role</label>
              <input type="text" id="title" name="title" required />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="instagram">Instagram Profile (optional)</label>
              <input type="text" id="instagram" name="instagram" placeholder="@username" />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="facebook">Facebook Profile (optional)</label>
              <input type="text" id="facebook" name="facebook" placeholder="URL or username" />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="twitter">Twitter/X Profile (optional)</label>
              <input type="text" id="twitter" name="twitter" placeholder="@username" />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="linkedin">LinkedIn Profile (optional)</label>
              <input type="text" id="linkedin" name="linkedin" placeholder="URL or username" />
            </div>
          </div>
          
          <div className={styles.formSection}>
            <h3>Content Preferences</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="comfortableTopics">Topics you're comfortable/passionate speaking about</label>
              <textarea id="comfortableTopics" name="comfortableTopics"></textarea>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="avoidTopics">Topics you prefer to avoid</label>
              <textarea id="avoidTopics" name="avoidTopics"></textarea>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="writingStyle">Writing/communication style preferences</label>
              <select id="writingStyle" name="writingStyle">
                <option value="">Select one...</option>
                <option value="formal">Formal/Professional</option>
                <option value="conversational">Conversational/Friendly</option>
                <option value="inspirational">Inspirational/Motivational</option>
                <option value="educational">Educational/Informative</option>
                <option value="storytelling">Narrative/Storytelling</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="existingContent">Any existing content that represents your voice (URLs or descriptions)</label>
              <textarea id="existingContent" name="existingContent"></textarea>
            </div>
          </div>
          
          <button type="submit" className={styles.submitBtn}>Submit & Confirm Workshop</button>
        </form>
      </div>
    </div>
  )
}
