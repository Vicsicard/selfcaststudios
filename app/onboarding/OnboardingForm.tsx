'use client'

import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import styles from './styles.module.css'

export default function OnboardingForm() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [supabase, setSupabase] = useState<any>(null);

  // Initialize Supabase client when component mounts
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      const SUPABASE_URL = 'https://aqicztygjpmunfljjuto.supabase.co';
      const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaWN6dHlnanBtdW5mbGpqdXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDU1ODIsImV4cCI6MjA1OTI4MTU4Mn0.5e2hvTckSSbTFLBjQiccrvjoBd6QQDX0X4tccFOc1rs';
      
      console.log('Initializing Supabase client...');
      console.log('Window object available:', typeof window !== 'undefined');
      console.log('Supabase in window:', typeof window.supabase);
      
      try {
        // Check if window.supabase exists (script loaded)
        if (window.supabase) {
          console.log('Creating Supabase client with URL:', SUPABASE_URL);
          const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
          console.log('Supabase client created:', supabaseClient);
          setSupabase(supabaseClient);
          console.log('Supabase client initialized and set in state');
          
          // Test connection
          testSupabaseConnection(supabaseClient);
        } else {
          console.error('Supabase script not loaded yet. Make sure the script is properly loaded before initialization.');
        }
      } catch (error) {
        console.error('Error initializing Supabase client:', error);
      }
    }
  }, []);

  // Test Supabase connection
  const testSupabaseConnection = async (client: any) => {
    try {
      console.log('Testing Supabase connection...');
      const { data, error } = await client
        .from('dynamic_content')
        .select('project_id')
        .limit(1);
      
      if (error) {
        console.error('Supabase connection test failed:', error);
      } else {
        console.log('Supabase connection test successful:', data);
        
        // Try inserting a test record with a simple project ID
        const testProjectId = 'test-project-' + Date.now();
        console.log('Attempting to insert test record with ID:', testProjectId);
        
        const { data: insertData, error: insertError } = await client
          .from('dynamic_content')
          .insert({
            project_id: testProjectId,
            key: 'test_key',
            value: 'Test value from onboarding form at ' + new Date().toISOString()
          });
        
        if (insertError) {
          console.error('Test insert failed:', insertError);
        } else {
          console.log('Test insert successful:', insertData);
        }
      }
    } catch (error) {
      console.error('Error testing Supabase connection:', error);
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
    
    // Custom onboarding fields
    if (formData.phone) {
      records.push({
        project_id: projectId,
        key: 'onboarding_phone',
        value: formData.phone
      });
    }
    
    if (formData.title) {
      records.push({
        project_id: projectId,
        key: 'onboarding_title',
        value: formData.title
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

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error state
    setSubmitError(null);

    // Set loading state
    setIsSubmitting(true);

    // Get form data
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    
    // Convert FormData to a regular object
    const formDataObject: Record<string, any> = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
      console.log(`Form field: ${key} = ${value}`); // Log each form field
    });
    
    // Add the selected color if it exists
    if (selectedColor) {
      formDataObject.colorPreference = selectedColor;
      console.log(`Selected color: ${selectedColor}`);
    }
    
    try {
      console.log('Processing form data...', formDataObject);
      
      // Ensure we have the required fields
      if (!formDataObject.fullName) {
        throw new Error('Full name is required');
      }
      
      // Check if Supabase client is initialized
      if (!supabase) {
        throw new Error('Database connection not initialized. Please refresh the page and try again.');
      }
      
      // Generate a unique project ID
      const newProjectId = generateProjectId(formDataObject.fullName);
      console.log('Generated project ID:', newProjectId);
      
      // Map form fields to content editor fields
      const contentRecords = mapFormFieldsToContentEditor(formDataObject, newProjectId);
      console.log('Mapped content records:', contentRecords);
      
      // Insert data into Supabase directly
      console.log('Inserting data into Supabase...');
      
      // Insert each record individually for better error tracking
      let successCount = 0;
      let errorCount = 0;
      
      for (const record of contentRecords) {
        console.log(`Inserting record: ${record.key} for project ${newProjectId}`);
        
        const { data, error } = await supabase
          .from('dynamic_content')
          .insert(record);
        
        if (error) {
          console.error(`Error inserting record ${record.key}:`, error);
          errorCount++;
        } else {
          console.log(`Successfully inserted record ${record.key}`);
          successCount++;
        }
      }
      
      console.log(`Insertion complete. Success: ${successCount}, Errors: ${errorCount}`);
      
      if (errorCount > 0 && successCount === 0) {
        throw new Error(`Failed to save any data. Please try again.`);
      }
      
      // Store the project ID in localStorage for potential future use
      localStorage.setItem('selfcastProjectId', newProjectId);
      setProjectId(newProjectId);
      console.log('Project ID saved:', newProjectId);
      
      // Show success message
      setFormSubmitted(true);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError((error as Error).message || 'There was an error submitting your information. Please try again or contact support.');
    } finally {
      // Reset loading state
      setIsSubmitting(false);
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
      {/* Supabase Script */}
      <Script 
        src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" 
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Supabase script loaded successfully');
          // Initialize Supabase immediately after script loads
          if (typeof window !== 'undefined' && window.supabase) {
            const SUPABASE_URL = 'https://aqicztygjpmunfljjuto.supabase.co';
            const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaWN6dHlnanBtdW5mbGpqdXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDU1ODIsImV4cCI6MjA1OTI4MTU4Mn0.5e2hvTckSSbTFLBjQiccrvjoBd6QQDX0X4tccFOc1rs';
            const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            setSupabase(supabaseClient);
            console.log('Supabase client initialized in onLoad callback');
          }
        }}
        onError={() => console.error('Failed to load Supabase script')}
      />
      
      <div className={styles.welcomeCard}>
        <h1>Welcome to Self Cast Studios!</h1>
        <p>Thank you for subscribing to our Core Visibility Package. You're in the right place to transform your personal brand with authentic storytelling.</p>
        
        {/* Debug Button - Only visible in development */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
            <h3>Debug Tools</h3>
            <button 
              onClick={() => {
                if (supabase) {
                  const testProjectId = 'manual-test-' + Date.now();
                  console.log('Manual test: inserting record with ID:', testProjectId);
                  
                  supabase
                    .from('dynamic_content')
                    .insert({
                      project_id: testProjectId,
                      key: 'manual_test_key',
                      value: 'Manual test value at ' + new Date().toISOString()
                    })
                    .then(({ data, error }) => {
                      if (error) {
                        console.error('Manual test insert failed:', error);
                        alert('Test failed: ' + error.message);
                      } else {
                        console.log('Manual test insert successful:', data);
                        alert('Test successful! Project ID: ' + testProjectId);
                      }
                    });
                } else {
                  console.error('Supabase client not initialized');
                  alert('Supabase client not initialized. Check console for details.');
                }
              }}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#4a90e2', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Test Supabase Connection
            </button>
          </div>
        )}
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

        {submitError && (
          <div className={styles.errorMessage}>
            <p>{submitError}</p>
          </div>
        )}

        <button 
          type="submit" 
          className={`${styles.submitBtn} ${isSubmitting ? styles.submitting : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className={styles.spinner}></span>
              Submitting...
            </>
          ) : (
            'Submit & Confirm Workshop'
          )}
        </button>
      </form>
    </>
  );
}
