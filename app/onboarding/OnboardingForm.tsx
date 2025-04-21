'use client'

import React, { useState } from 'react'
import Script from 'next/script'
import styles from './styles.module.css'

export default function OnboardingForm() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get form data
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    
    // Convert FormData to a regular object
    const formDataObject: Record<string, any> = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    
    // Add the selected color if it exists
    if (selectedColor) {
      formDataObject.colorPreference = selectedColor;
    }
    
    try {
      // Send data to our API endpoint
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }
      
      // Store the project ID in localStorage for potential future use
      if (result.projectId) {
        localStorage.setItem('selfcastProjectId', result.projectId);
        setProjectId(result.projectId);
      }
      
      // Show success message
      setFormSubmitted(true);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your information. Please try again or contact support.');
    }
  };
  
  if (formSubmitted) {
    return (
      <div className={styles.successMessage}>
        <h2>Thank You!</h2>
        <p>Your information has been submitted successfully. We're excited to start working on your personal brand!</p>
        
        {projectId && (
          <div className={styles.projectIdContainer}>
            <p><strong>Your Project ID:</strong> {projectId}</p>
            <p className={styles.projectIdNote}>Please save this ID for your records. It will be used to identify your project in our system.</p>
          </div>
        )}
        
        <p>You should receive a confirmation email shortly with details about your scheduled workshop and next steps.</p>
        <p>Your personal brand website is being set up and will be available soon. We'll notify you when it's ready for your review.</p>
        <p>If you have any questions in the meantime, please contact us at <a href="mailto:hello@selfcaststudios.com">hello@selfcaststudios.com</a>.</p>
      </div>
    );
  }
  
  return (
    <>
      <div className={styles.welcomeCard}>
        <h1>Welcome to Self Cast Studios!</h1>
        <p>Thank you for subscribing to our Core Visibility Package. You're in the right place to transform your personal brand with authentic storytelling.</p>
      </div>
      
      <div className={styles.packageDetails}>
        <h2>Your Core Visibility Package Includes:</h2>
        <ul className={styles.packageList}>
          <li>60-min storytelling workshop</li>
          <li>4 custom blog posts</li>
          <li>4 platform-specific social posts</li>
          <li>Personal bio + branded quote graphics</li>
          <li>Your own custom personal brand website</li>
        </ul>
      </div>
      
      <div className={styles.nextSteps}>
        <h2>Next Steps</h2>
        <p>To get started on your personal brand journey, we need to gather some information and schedule your storytelling workshop. This workshop is where we'll uncover the authentic voice and stories that will form the foundation of all your content.</p>
        <p>Please complete the form below and select a time for your workshop. Once submitted, you'll receive a confirmation email with all the details.</p>
      </div>
      
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <h3>Schedule Your Storytelling Workshop</h3>
          <p>Select a date and time that works for you. The workshop will last 60 minutes.</p>
          
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
        
        <div className={styles.formSection}>
          <h3>Visual Branding</h3>
          
          <div className={styles.formGroup}>
            <label>Color preferences for your personal brand</label>
            <p className={styles.formText}>Select a base color scheme (you can refine this later)</p>
            
            <div className={styles.colorOptions}>
              <div 
                className={`${styles.colorOption} ${styles.blue} ${selectedColor === 'blue' ? styles.selected : ''}`} 
                title="Blue"
                onClick={() => handleColorSelect('blue')}
              ></div>
              <div 
                className={`${styles.colorOption} ${styles.navy} ${selectedColor === 'navy' ? styles.selected : ''}`} 
                title="Navy"
                onClick={() => handleColorSelect('navy')}
              ></div>
              <div 
                className={`${styles.colorOption} ${styles.gold} ${selectedColor === 'gold' ? styles.selected : ''}`} 
                title="Gold"
                onClick={() => handleColorSelect('gold')}
              ></div>
              <div 
                className={`${styles.colorOption} ${styles.green} ${selectedColor === 'green' ? styles.selected : ''}`} 
                title="Green"
                onClick={() => handleColorSelect('green')}
              ></div>
              <div 
                className={`${styles.colorOption} ${styles.red} ${selectedColor === 'red' ? styles.selected : ''}`} 
                title="Red"
                onClick={() => handleColorSelect('red')}
              ></div>
            </div>
            <input type="hidden" name="colorPreference" value={selectedColor || ''} />
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Website Details</h3>
          
          <div className={styles.formGroup}>
            <label htmlFor="domainPreference">Domain name preferences (if you don't already have one)</label>
            <input type="text" id="domainPreference" name="domainPreference" placeholder="e.g., yourname.com, yourbrand.com" />
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Goals & Expectations</h3>
          
          <div className={styles.formGroup}>
            <label htmlFor="successDefinition">What success looks like for you with this package</label>
            <textarea id="successDefinition" name="successDefinition"></textarea>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="contentGoals">Specific goals for your content</label>
            <select id="contentGoals" name="contentGoals">
              <option value="">Select primary goal...</option>
              <option value="thoughtLeadership">Thought Leadership</option>
              <option value="careerTransition">Career Transition</option>
              <option value="clientAcquisition">Client Acquisition</option>
              <option value="personalBranding">Personal Branding</option>
              <option value="speakingOpportunities">Speaking Opportunities</option>
              <option value="other">Other (please specify)</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="successMetrics">How you plan to measure success</label>
            <textarea id="successMetrics" name="successMetrics" placeholder="e.g., engagement, inquiries, opportunities"></textarea>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Previous Experience</h3>
          
          <div className={styles.formGroup}>
            <label htmlFor="pastExperience">Past experiences with personal branding services</label>
            <textarea id="pastExperience" name="pastExperience"></textarea>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="pastLessons">What worked/didn't work in previous efforts</label>
            <textarea id="pastLessons" name="pastLessons"></textarea>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="challenges">Specific challenges you've faced with your personal brand</label>
            <textarea id="challenges" name="challenges"></textarea>
          </div>
        </div>
        
        <button type="submit" className={styles.submitBtn}>Submit & Confirm Workshop</button>
      </form>
    </>
  );
}
