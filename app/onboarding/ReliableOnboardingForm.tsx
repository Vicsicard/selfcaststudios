'use client'

import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'

export default function ReliableOnboardingForm() {
  // State management
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [supabase, setSupabase] = useState<any>(null);
  const [logs, setLogs] = useState<{message: string, type: string}[]>([]);
  
  // Add a log entry
  const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setLogs(prev => [...prev, { message, type }]);
    console.log(`[${type.toUpperCase()}] ${message}`);
  };
  
  // Initialize Supabase client when the component mounts
  useEffect(() => {
    // Load Supabase script directly
    const loadSupabase = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.async = true;
      script.onload = () => {
        addLog('Supabase script loaded successfully', 'success');
        initializeSupabase();
      };
      script.onerror = () => {
        addLog('Failed to load Supabase script', 'error');
      };
      document.body.appendChild(script);
    };
    
    loadSupabase();
  }, []);
  
  // Initialize Supabase client when the script loads
  const initializeSupabase = () => {
    try {
      addLog('Initializing Supabase client...');
      
      if (typeof window !== 'undefined' && window.supabase) {
        const SUPABASE_URL = 'https://aqicztygjpmunfljjuto.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaWN6dHlnanBtdW5mbGpqdXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDU1ODIsImV4cCI6MjA1OTI4MTU4Mn0.5e2hvTckSSbTFLBjQiccrvjoBd6QQDX0X4tccFOc1rs';
        
        const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        setSupabase(supabaseClient);
        addLog('Supabase client initialized successfully', 'success');
        
        // Test connection
        testSupabaseConnection(supabaseClient);
        return true;
      } else {
        addLog('Supabase library not loaded yet', 'error');
        return false;
      }
    } catch (error) {
      addLog(`Error initializing Supabase: ${(error as Error).message}`, 'error');
      return false;
    }
  };
  
  // Test Supabase connection
  const testSupabaseConnection = async (client: any) => {
    try {
      addLog('Testing Supabase connection...');
      
      const { data, error } = await client
        .from('dynamic_content')
        .select('project_id')
        .limit(1);
      
      if (error) {
        throw error;
      }
      
      addLog(`Connection successful! Found ${data.length} records.`, 'success');
      
      // Try inserting a test record
      const testProjectId = 'test-connection-' + Date.now();
      addLog(`Testing insertion with project ID: ${testProjectId}`);
      
      const { error: insertError } = await client
        .from('dynamic_content')
        .insert({
          project_id: testProjectId,
          key: 'test_key',
          value: 'Test connection from onboarding form at ' + new Date().toISOString()
        });
      
      if (insertError) {
        throw insertError;
      }
      
      addLog('Test record inserted successfully', 'success');
      return true;
    } catch (error) {
      addLog(`Connection test failed: ${(error as any).message}`, 'error');
      return false;
    }
  };
  
  // Generate a unique project ID based on the client's name and current timestamp
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
  const mapFormFieldsToContentEditor = (formData: any, projectId: string) => {
    // Create an array to hold all the records
    const records = [];
    
    // Current year for footer and other date-related fields
    const currentYear = new Date().getFullYear();
    
    // Personal Information - these match content editor fields
    if (formData.fullName) {
      records.push({
        project_id: projectId,
        key: 'rendered_title',
        value: formData.fullName
      });
      
      // Also store in client_name which is used in some templates
      records.push({
        project_id: projectId,
        key: 'client_name',
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
    
    if (formData.profession) {
      records.push({
        project_id: projectId,
        key: 'rendered_subtitle',
        value: formData.profession
      });
    }
    
    // Social Media - these match content editor fields
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
    
    if (formData.linkedin) {
      records.push({
        project_id: projectId,
        key: 'linkedin_url',
        value: formData.linkedin
      });
    }
    
    // Content Preferences
    if (formData.comfortableTopics) {
      records.push({
        project_id: projectId,
        key: 'rendered_bio_html',
        value: formData.comfortableTopics
      });
    }
    
    if (formData.writingStyle) {
      records.push({
        project_id: projectId,
        key: 'style_package',
        value: formData.writingStyle
      });
    }
    
    // Visual Branding - these match content editor fields
    if (formData.colorPreference) {
      records.push({
        project_id: projectId,
        key: 'primary_color',
        value: formData.colorPreference
      });
      
      // Also set a secondary color that's a lighter shade
      records.push({
        project_id: projectId,
        key: 'secondary_color',
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
      value: ` ${currentYear} ${formData.fullName || 'Client'} | All Rights Reserved`
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
    addLog(`Selected color: ${color}`);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
        addLog(`Form field: ${key} = ${value}`);
      });
      
      // Add the selected color if it exists
      if (selectedColor) {
        formDataObject.colorPreference = selectedColor;
        addLog(`Added color preference: ${selectedColor}`);
      }
      
      // Ensure we have the required fields
      if (!formDataObject.fullName) {
        throw new Error('Full name is required');
      }
      
      // Check if Supabase client is initialized
      if (!supabase) {
        // Try to initialize it now
        if (!initializeSupabase()) {
          throw new Error('Database connection not initialized. Please refresh the page and try again.');
        }
      }
      
      // Generate a unique project ID
      const newProjectId = generateProjectId(formDataObject.fullName);
      addLog(`Generated project ID: ${newProjectId}`);
      
      // Map form fields to content editor fields
      const contentRecords = mapFormFieldsToContentEditor(formDataObject, newProjectId);
      addLog(`Mapped ${contentRecords.length} content records`);
      
      // Insert data into Supabase
      addLog('Inserting records into Supabase...');
      
      let successCount = 0;
      let errorCount = 0;
      let errors: any[] = [];
      
      for (const record of contentRecords) {
        addLog(`Inserting record: ${record.key} for project ${newProjectId}`);
        
        try {
          const { data, error } = await supabase
            .from('dynamic_content')
            .insert(record);
          
          if (error) {
            addLog(`Error inserting record ${record.key}: ${error.message}`, 'error');
            errors.push({ key: record.key, error: error.message });
            errorCount++;
          } else {
            addLog(`Successfully inserted record ${record.key}`, 'success');
            successCount++;
          }
        } catch (error) {
          addLog(`Exception inserting record ${record.key}: ${(error as Error).message}`, 'error');
          errors.push({ key: record.key, error: (error as Error).message });
          errorCount++;
        }
      }
      
      addLog(`Insertion complete. Success: ${successCount}, Errors: ${errorCount}`);
      
      if (errorCount > 0 && successCount === 0) {
        throw new Error(`Failed to save any data. Please try again.`);
      }
      
      // Store the project ID in localStorage for potential future use
      localStorage.setItem('selfcastProjectId', newProjectId);
      setProjectId(newProjectId);
      addLog(`Project ID saved: ${newProjectId}`, 'success');
      
      // Show success message
      setFormSubmitted(true);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      addLog(`Error submitting form: ${(error as Error).message}`, 'error');
      setSubmitError((error as Error).message || 'There was an error submitting your information. Please try again or contact support.');
    } finally {
      // Reset loading state
      setIsSubmitting(false);
    }
  };
  
  // Success message component
  if (formSubmitted) {
    return (
      <>
        <div className={styles.overlay}></div>
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
  
  return (
    <>
      {/* Debug Panel (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ 
          margin: '20px 0', 
          padding: '15px', 
          backgroundColor: '#1e1e1e', 
          color: '#ddd',
          borderRadius: '5px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          <h3 style={{ color: '#fff', marginTop: 0 }}>Debug Panel</h3>
          
          <div style={{ 
            maxHeight: '200px', 
            overflowY: 'auto', 
            marginBottom: '15px',
            padding: '10px',
            backgroundColor: '#2a2a2a',
            borderRadius: '3px'
          }}>
            {logs.map((log, index) => (
              <div key={index} style={{ 
                color: log.type === 'error' ? '#ff6b6b' : log.type === 'success' ? '#6bff6b' : '#ddd',
                marginBottom: '5px'
              }}>
                {log.message}
              </div>
            ))}
          </div>
          
          <div>
            <button 
              onClick={() => initializeSupabase()} 
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#4a90e2', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Test Supabase Connection
            </button>
            
            <button 
              onClick={() => setLogs([])} 
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#6c757d', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear Logs
            </button>
          </div>
        </div>
      )}
      
      {/* Form Error Display */}
      {submitError && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f8d7da', 
          color: '#721c24',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          <strong>Error:</strong> {submitError}
        </div>
      )}
      
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
            <label htmlFor="profession">Current Profession/Industry</label>
            <input type="text" id="profession" name="profession" required />
          </div>
        </div>

        <div className={styles.formSection}>
          <h3>Visual Branding</h3>
          <p>Select a color that best represents your personal brand. This will be used as the primary color for your website.</p>

          <div className={styles.colorOptions}>
            <div 
              className={`${styles.colorOption} ${selectedColor === '#4a6fa5' ? styles.selected : ''}`}
              style={{ backgroundColor: '#4a6fa5' }}
              onClick={() => handleColorSelect('#4a6fa5')}
            ></div>
            <div 
              className={`${styles.colorOption} ${selectedColor === '#28a745' ? styles.selected : ''}`}
              style={{ backgroundColor: '#28a745' }}
              onClick={() => handleColorSelect('#28a745')}
            ></div>
            <div 
              className={`${styles.colorOption} ${selectedColor === '#dc3545' ? styles.selected : ''}`}
              style={{ backgroundColor: '#dc3545' }}
              onClick={() => handleColorSelect('#dc3545')}
            ></div>
            <div 
              className={`${styles.colorOption} ${selectedColor === '#6f42c1' ? styles.selected : ''}`}
              style={{ backgroundColor: '#6f42c1' }}
              onClick={() => handleColorSelect('#6f42c1')}
            ></div>
            <div 
              className={`${styles.colorOption} ${selectedColor === '#fd7e14' ? styles.selected : ''}`}
              style={{ backgroundColor: '#fd7e14' }}
              onClick={() => handleColorSelect('#fd7e14')}
            ></div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3>Content Preferences</h3>

          <div className={styles.formGroup}>
            <label htmlFor="comfortableTopics">Topics You're Comfortable Discussing</label>
            <textarea id="comfortableTopics" name="comfortableTopics" placeholder="What topics in your field are you most comfortable discussing?"></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="successDefinition">How Do You Define Success?</label>
            <textarea id="successDefinition" name="successDefinition" placeholder="What does success mean to you in your professional life?"></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contentGoals">Content Goals</label>
            <textarea id="contentGoals" name="contentGoals" placeholder="What do you hope to achieve with your content?"></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="challenges">Challenges You've Overcome</label>
            <textarea id="challenges" name="challenges" placeholder="What professional challenges have you overcome that might inspire others?"></textarea>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3>Social Media</h3>
          <p>Please provide your social media handles if you'd like us to link to them from your website.</p>

          <div className={styles.formGroup}>
            <label htmlFor="linkedin">LinkedIn URL</label>
            <input type="url" id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/yourprofile" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="twitter">Twitter URL</label>
            <input type="url" id="twitter" name="twitter" placeholder="https://twitter.com/yourhandle" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="instagram">Instagram URL</label>
            <input type="url" id="instagram" name="instagram" placeholder="https://instagram.com/yourhandle" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="facebook">Facebook URL</label>
            <input type="url" id="facebook" name="facebook" placeholder="https://facebook.com/yourpage" />
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={styles.submitButton} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Information'}
          </button>
        </div>
      </form>
    </>
  );
}
