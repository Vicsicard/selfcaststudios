'use client'

import React, { useState, useEffect } from 'react'
import { Playfair_Display, Raleway } from 'next/font/google'
import Script from 'next/script'
import styles from './styles.module.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export default function ReliableOnboardingPage() {
  const [selectedColor, setSelectedColor] = useState<string>('#4a6fa5');
  const [selectedStyle, setSelectedStyle] = useState<string>('standard-professional');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [supabase, setSupabase] = useState<any>(null);
  const [debugMessages, setDebugMessages] = useState<string[]>([]);
  const [showDebug, setShowDebug] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  // Initialize Supabase client when the script loads
  const initializeSupabase = () => {
    if (typeof window !== 'undefined' && window.supabase) {
      try {
        const SUPABASE_URL = 'https://aqicztygjpmunfljjuto.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaWN6dHlnanBtdW5mbGpqdXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDU1ODIsImV4cCI6MjA1OTI4MTU4Mn0.5e2hvTckSSbTFLBjQiccrvjoBd6QQDX0X4tccFOc1rs';
        
        addDebugMessage('Creating Supabase client...');
        const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        setSupabase(supabaseClient);
        addDebugMessage('Supabase client initialized successfully');
        
        // Check if we're in development mode
        if (process.env.NODE_ENV === 'development') {
          setShowDebug(true);
        }
        
        return supabaseClient;
      } catch (error) {
        addDebugMessage(`Error initializing Supabase: ${error}`);
        console.error('Error initializing Supabase:', error);
        return null;
      }
    } else {
      addDebugMessage('Supabase not available yet');
      return null;
    }
  };

  // Add debug message
  const addDebugMessage = (message: string) => {
    setDebugMessages(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
    console.log(message);
  };

  // Test Supabase connection
  const testConnection = async () => {
    try {
      if (!supabase) {
        const client = initializeSupabase();
        if (!client) {
          throw new Error('Failed to initialize Supabase client');
        }
      }
      
      addDebugMessage('Testing connection to Supabase...');
      
      const { data, error } = await supabase
        .from('dynamic_content')
        .select('project_id')
        .limit(5);
      
      if (error) throw error;
      
      const uniqueIds = Array.from(new Set(data.map((item: any) => item.project_id)));
      addDebugMessage(`Connection successful! Found projects: ${uniqueIds.join(', ')}`);
      
      return true;
    } catch (error) {
      addDebugMessage(`Connection test failed: ${error}`);
      console.error('Connection test failed:', error);
      return false;
    }
  };

  // Generate a project ID based on name and timestamp
  const generateProjectId = (fullName: string): string => {
    const nameParts = fullName.toLowerCase().trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : 'unknown';
    
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    
    return `${lastName}-${firstName}-${year}${month}${day}-${hour}${minute}`;
  };

  // Map form fields to content editor fields
  const mapFormFieldsToContentEditor = (formData: Record<string, any>, projectId: string): any[] => {
    const records = [];
    const currentYear = new Date().getFullYear();
    
    // Basic information
    if (formData.fullName) {
      records.push({
        project_id: projectId,
        key: 'rendered_title',
        value: formData.fullName
      });
    }
    
    if (formData.title) {
      records.push({
        project_id: projectId,
        key: 'rendered_subtitle',
        value: formData.title
      });
    }
    
    if (formData.email) {
      records.push({
        project_id: projectId,
        key: 'email_address',
        value: formData.email
      });
    }
    
    // Social media
    if (formData.linkedin) {
      records.push({
        project_id: projectId,
        key: 'linkedin_url',
        value: formData.linkedin
      });
    }
    
    if (formData.instagram) {
      records.push({
        project_id: projectId,
        key: 'instagram_url',
        value: formData.instagram
      });
    }
    
    if (formData.facebook) {
      records.push({
        project_id: projectId,
        key: 'facebook_url',
        value: formData.facebook
      });
    }
    
    if (formData.twitter) {
      records.push({
        project_id: projectId,
        key: 'twitter_url',
        value: formData.twitter
      });
    }
    
    // Style package
    if (formData.stylePackage) {
      records.push({
        project_id: projectId,
        key: 'style_package',
        value: formData.stylePackage
      });
    }
    
    // Color preference
    if (formData.colorPreference) {
      records.push({
        project_id: projectId,
        key: 'primary_color',
        value: formData.colorPreference
      });
      
      // Add accent color as well
      records.push({
        project_id: projectId,
        key: 'accent_color',
        value: formData.colorPreference
      });
    }
    
    // Additional content editor fields
    if (formData.successDefinition) {
      records.push({
        project_id: projectId,
        key: 'rendered_bio_html_card_1',
        value: formData.successDefinition
      });
    }
    
    if (formData.contentGoals) {
      records.push({
        project_id: projectId,
        key: 'rendered_bio_html_card_2',
        value: formData.contentGoals
      });
    }
    
    if (formData.challenges) {
      records.push({
        project_id: projectId,
        key: 'rendered_bio_html_card_3',
        value: formData.challenges
      });
    }
    
    // Add standard fields that the content editor expects
    records.push({
      project_id: projectId,
      key: 'current_year',
      value: currentYear.toString()
    });
    
    // Add a default footer slogan
    records.push({
      project_id: projectId,
      key: 'rendered_footer_slogan',
      value: `© ${currentYear} ${formData.fullName || 'Client'} | All Rights Reserved`
    });
    
    // Add default quotes (these appear in many templates)
    records.push({
      project_id: projectId,
      key: 'quote_1',
      value: '"Success is not final, failure is not fatal: It is the courage to continue that counts."'
    });
    
    records.push({
      project_id: projectId,
      key: 'quote_2',
      value: '"The future belongs to those who believe in the beauty of their dreams."'
    });
    
    records.push({
      project_id: projectId,
      key: 'quote_3',
      value: '"The best way to predict the future is to create it."'
    });
    
    // Custom onboarding fields
    if (formData.phone) {
      records.push({
        project_id: projectId,
        key: 'onboarding_phone',
        value: formData.phone
      });
    }
    
    // Add metadata about when this project was created via onboarding
    records.push({
      project_id: projectId,
      key: 'onboarding_created_at',
      value: new Date().toISOString()
    });
    
    return records;
  };

  // Handle color selection
  const handleColorSelect = (color: string, style: string) => {
    setSelectedColor(color);
    setSelectedStyle(style);
    addDebugMessage(`Selected color: ${color}, style: ${style}`);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state
    setSubmitError(null);
    
    // Set loading state
    setIsSubmitting(true);
    
    try {
      addDebugMessage('Processing form submission...');
      
      // Get form data
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);
      
      // Convert FormData to a regular object
      const formDataObject: Record<string, any> = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
        addDebugMessage(`Form field: ${key} = ${value}`);
      });
      
      // Add the selected color and style
      formDataObject.colorPreference = selectedColor;
      formDataObject.stylePackage = selectedStyle;
      
      // Store form data for CSV export
      setFormData(formDataObject);
      
      // Check if Supabase client is initialized
      if (!supabase) {
        const client = initializeSupabase();
        if (!client) {
          throw new Error('Database connection not initialized. Please refresh the page and try again.');
        }
      }
      
      // Generate a unique project ID
      const newProjectId = generateProjectId(formDataObject.fullName);
      addDebugMessage(`Generated project ID: ${newProjectId}`);
      
      // Map form fields to content editor fields
      const contentRecords = mapFormFieldsToContentEditor(formDataObject, newProjectId);
      addDebugMessage(`Mapped ${contentRecords.length} content records`);
      
      // Insert data into Supabase
      addDebugMessage('Inserting data into Supabase...');
      
      // Insert each record individually for better error tracking
      let successCount = 0;
      let errorCount = 0;
      
      for (const record of contentRecords) {
        addDebugMessage(`Inserting record: ${record.key} for project ${newProjectId}`);
        
        const { data, error } = await supabase
          .from('dynamic_content')
          .insert(record);
        
        if (error) {
          addDebugMessage(`Error inserting record ${record.key}: ${error.message}`);
          console.error(`Error inserting record ${record.key}:`, error);
          errorCount++;
        } else {
          addDebugMessage(`Successfully inserted record ${record.key}`);
          successCount++;
        }
      }
      
      addDebugMessage(`Insertion complete. Success: ${successCount}, Errors: ${errorCount}`);
      
      if (errorCount > 0 && successCount === 0) {
        throw new Error(`Failed to save any data. Please try again.`);
      }
      
      // Store the project ID
      setProjectId(newProjectId);
      
      // Show success message
      setFormSubmitted(true);
      setShowThankYouPopup(true);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      addDebugMessage(`Error submitting form: ${error}`);
      console.error('Error submitting form:', error);
      setSubmitError((error as Error).message || 'There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate CSV from form data
  const generateCSV = () => {
    if (!formData || !projectId) return '';
    
    // Create CSV header row
    const headers = Object.keys(formData);
    
    // Add project ID to the data
    const dataWithProjectId = { ...formData, projectId };
    
    // Create CSV content
    const csvContent = [
      headers.join(','), // Header row
      Object.values(dataWithProjectId).map(value => `"${value}"`).join(',') // Data row
    ].join('\n');
    
    return csvContent;
  };

  // Handle CSV download
  const handleDownloadCSV = () => {
    const csvContent = generateCSV();
    if (!csvContent) return;
    
    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `onboarding-data-${projectId}.csv`);
    
    // Append the link to the document
    document.body.appendChild(link);
    
    // Click the link to trigger the download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Close thank you popup
  const closeThankYouPopup = () => {
    setShowThankYouPopup(false);
  };

  // Render thank you message if form is submitted
  if (formSubmitted) {
    return (
      <div className={styles.container}>
        {showThankYouPopup && (
          <>
            <div className={styles.overlay} onClick={closeThankYouPopup}></div>
            <div className={styles.successMessage}>
              <button className={styles.closeButton} onClick={closeThankYouPopup}>×</button>
              <h2>Thank You!</h2>
              <p>Your information has been submitted successfully. We're excited to start working on your personal brand!</p>
              
              {projectId && (
                <div className={styles.projectIdContainer}>
                  <p><strong>Your Project ID:</strong> {projectId}</p>
                  <p className={styles.projectIdNote}>Please save this ID for your records. It will be used to identify your project in our system.</p>
                  
                  <button 
                    className={styles.downloadButton} 
                    onClick={handleDownloadCSV}
                  >
                    Download Form Data (CSV)
                  </button>
                </div>
              )}
              
              <p>You should receive a confirmation email shortly with details about your scheduled workshop and next steps.</p>
              <p>Your personal brand website is being set up and will be available soon. We'll notify you when it's ready for your review.</p>
              <p>If you have any questions in the meantime, please contact us at <a href="mailto:hello@selfcaststudios.com">hello@selfcaststudios.com</a>.</p>
            </div>
          </>
        )}
        
        <div className={styles.formCard}>
          <h2>Submission Complete</h2>
          <p>Thank you for completing the onboarding process. Your project ID is: <strong>{projectId}</strong></p>
          <p>You can download your form data or view the thank you message again using the buttons below.</p>
          
          <div className={styles.formActions}>
            <button 
              className={styles.submitButton} 
              onClick={() => setShowThankYouPopup(true)}
            >
              View Thank You Message
            </button>
            
            <button 
              className={styles.downloadButton} 
              onClick={handleDownloadCSV}
            >
              Download Form Data (CSV)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${playfair.className}`}>
      {/* Supabase Script */}
      <Script 
        src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" 
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Supabase script loaded successfully');
          initializeSupabase();
        }}
        onError={() => console.error('Failed to load Supabase script')}
      />
      
      <h1>Welcome to Self Cast Studios!</h1>
      
      <div className={styles.formCard}>
        <p>Thank you for subscribing to our Core Visibility Package. You're in the right place to transform your personal brand with authentic storytelling.</p>
        
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
              <label htmlFor="title">Professional Title</label>
              <input type="text" id="title" name="title" placeholder="e.g., Executive Coach, Marketing Consultant" />
            </div>
          </div>
          
          <div className={styles.formSection}>
            <h3>Social Media Profiles</h3>
            <p>Please share your social media profiles (optional):</p>
            
            <div className={styles.formGroup}>
              <label htmlFor="linkedin">LinkedIn Profile</label>
              <input type="url" id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/yourprofile" />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="instagram">Instagram Profile</label>
              <input type="url" id="instagram" name="instagram" placeholder="https://instagram.com/yourusername" />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="facebook">Facebook Profile</label>
              <input type="url" id="facebook" name="facebook" placeholder="https://facebook.com/yourusername" />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="twitter">Twitter/X Profile</label>
              <input type="url" id="twitter" name="twitter" placeholder="https://twitter.com/yourusername" />
            </div>
          </div>
          
          <div className={styles.formSection}>
            <h3>Brand Colors</h3>
            <p>Select a primary color for your personal brand:</p>
            
            <div className={styles.colorOptions}>
              <div 
                className={`${styles.colorOption} ${styles.blue} ${selectedColor === '#4a6fa5' ? styles.selected : ''}`} 
                onClick={() => handleColorSelect('#4a6fa5', 'standard-professional')}
              ></div>
              <div 
                className={`${styles.colorOption} ${styles.navy} ${selectedColor === '#1E293B' ? styles.selected : ''}`} 
                onClick={() => handleColorSelect('#1E293B', 'dark-professional')}
              ></div>
              <div 
                className={`${styles.colorOption} ${styles.gold} ${selectedColor === '#C8A456' ? styles.selected : ''}`} 
                onClick={() => handleColorSelect('#C8A456', 'light-professional')}
              ></div>
              <div 
                className={`${styles.colorOption} ${styles.green} ${selectedColor === '#34D399' ? styles.selected : ''}`} 
                onClick={() => handleColorSelect('#34D399', 'green-professional')}
              ></div>
              <div 
                className={`${styles.colorOption} ${styles.red} ${selectedColor === '#EF4444' ? styles.selected : ''}`} 
                onClick={() => handleColorSelect('#EF4444', 'red-professional')}
              ></div>
            </div>
          </div>
          
          <div className={styles.formSection}>
            <h3>Workshop Questions</h3>
            <p>These questions will help guide our workshop conversation:</p>
            
            <div className={styles.formGroup}>
              <label htmlFor="successDefinition">How do you define success in your work?</label>
              <textarea id="successDefinition" name="successDefinition"></textarea>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="contentGoals">What are your goals for your content and personal brand?</label>
              <textarea id="contentGoals" name="contentGoals"></textarea>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="challenges">What challenges are you facing in your professional life?</label>
              <textarea id="challenges" name="challenges"></textarea>
            </div>
          </div>
          
          {submitError && (
            <div className={styles.errorMessage}>
              <p>{submitError}</p>
            </div>
          )}
          
          <div className={styles.formActions}>
            <button 
              type="submit" 
              className={styles.submitButton} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit & Confirm Workshop'}
            </button>
          </div>
        </form>
        
        {/* Debug Panel - Only visible in development */}
        {showDebug && (
          <div className={styles.debugPanel}>
            <h3>Debug Information</h3>
            <button 
              type="button" 
              onClick={testConnection} 
              className={styles.debugButton}
            >
              Test Supabase Connection
            </button>
            <div className={styles.debugLog}>
              {debugMessages.map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
