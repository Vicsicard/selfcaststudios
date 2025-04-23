'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import styles from './styles.module.css'

// Initialize Supabase client
const supabaseUrl = 'https://aqicztygjpmunfljjuto.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaWN6dHlnanBtdW5mbGpqdXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDU1ODIsImV4cCI6MjA1OTI4MTU4Mn0.5e2hvTckSSbTFLBjQiccrvjoBd6QQDX0X4tccFOc1rs'

export default function SupabaseOnboardingForm() {
  const [selectedColor, setSelectedColor] = useState<string>('#4a6fa5');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [supabase, setSupabaseClient] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  // Initialize Supabase client when component mounts
  useEffect(() => {
    try {
      const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
      setSupabaseClient(supabaseClient);
      addDebugMessage('Supabase client initialized successfully');
      
      // Test connection
      testSupabaseConnection(supabaseClient);
    } catch (error) {
      addDebugMessage(`Error initializing Supabase client: ${error}`);
      console.error('Error initializing Supabase client:', error);
    }
  }, []);

  // Test Supabase connection
  const testSupabaseConnection = async (client: any) => {
    try {
      addDebugMessage('Testing Supabase connection...');
      const { data, error } = await client
        .from('dynamic_content')
        .select('*')
        .limit(1);
      
      if (error) {
        addDebugMessage(`Connection test failed: ${error.message}`);
        console.error('Connection test failed:', error);
      } else {
        addDebugMessage('Connection test successful');
        console.log('Connection test successful:', data);
      }
    } catch (error) {
      addDebugMessage(`Connection test error: ${error}`);
      console.error('Connection test error:', error);
    }
  };

  // Add debug message
  const addDebugMessage = (message: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    console.log(message);
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
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    addDebugMessage(`Selected color: ${color}`);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addDebugMessage('Form submitted');
    
    // Reset error state
    setSubmitError(null);
    
    // Set loading state
    setIsSubmitting(true);
    
    try {
      // Get form data
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);
      
      // Convert FormData to a regular object
      const formDataObject: Record<string, any> = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
        addDebugMessage(`Form field: ${key} = ${value}`);
      });
      
      // Add the selected color
      formDataObject.colorPreference = selectedColor;
      
      // Check if Supabase client is initialized
      if (!supabase) {
        throw new Error('Database connection not initialized. Please refresh the page and try again.');
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
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      const errorMessage = (error as Error).message || 'There was an error submitting your information. Please try again.';
      addDebugMessage(`Error submitting form: ${errorMessage}`);
      console.error('Error submitting form:', error);
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render thank you message if form is submitted
  if (formSubmitted) {
    return (
      <>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999
        }}></div>
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
      </>
    );
  }
  
  // Render form if not submitted
  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <h3>Schedule Your Storytelling Workshop</h3>
          <p>Select a date and time that works for you. The workshop will last 60 minutes.</p>
          
          <div className={styles.calendarContainer}>
            {/* Calendly Embed */}
            <div className="calendly-inline-widget" data-url="https://calendly.com/vicsicard/30min" style={{minWidth: '320px', height: '700px'}}></div>
            <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
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
            <label htmlFor="linkedin">LinkedIn Profile (optional)</label>
            <input type="url" id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/yourprofile" />
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Brand Colors</h3>
          <p className={styles.formText}>Select a primary color for your personal brand:</p>
          
          <div className={styles.colorOptions}>
            <div 
              className={`${styles.colorOption} ${styles.blue} ${selectedColor === '#4a6fa5' ? styles.selected : ''}`} 
              onClick={() => handleColorSelect('#4a6fa5')}
            ></div>
            <div 
              className={`${styles.colorOption} ${styles.navy} ${selectedColor === '#1E293B' ? styles.selected : ''}`} 
              onClick={() => handleColorSelect('#1E293B')}
            ></div>
            <div 
              className={`${styles.colorOption} ${styles.gold} ${selectedColor === '#C8A456' ? styles.selected : ''}`} 
              onClick={() => handleColorSelect('#C8A456')}
            ></div>
            <div 
              className={`${styles.colorOption} ${styles.green} ${selectedColor === '#34D399' ? styles.selected : ''}`} 
              onClick={() => handleColorSelect('#34D399')}
            ></div>
            <div 
              className={`${styles.colorOption} ${styles.red} ${selectedColor === '#EF4444' ? styles.selected : ''}`} 
              onClick={() => handleColorSelect('#EF4444')}
            ></div>
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
      {process.env.NODE_ENV === 'development' && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#f0f0f0', 
          borderRadius: '5px',
          border: '1px solid #ddd',
          fontSize: '14px',
          fontFamily: 'monospace'
        }}>
          <h3>Debug Information</h3>
          <div style={{ 
            maxHeight: '200px', 
            overflowY: 'auto', 
            backgroundColor: '#333', 
            color: '#0f0', 
            padding: '10px',
            borderRadius: '3px'
          }}>
            {debugInfo.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div>
          <div style={{ marginTop: '10px' }}>
            <button 
              type="button" 
              onClick={() => testSupabaseConnection(supabase)}
              style={{ 
                backgroundColor: '#007AFF', 
                color: 'white', 
                border: 'none', 
                padding: '5px 10px', 
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Test Supabase Connection
            </button>
          </div>
        </div>
      )}
    </>
  );
}
