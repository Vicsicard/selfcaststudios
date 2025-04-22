'use client'

import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'

// Declare window with supabase property
declare global {
  interface Window {
    supabase: {
      createClient: (url: string, key: string) => any;
    };
  }
}

export default function DirectSupabaseForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('#4a6fa5');
  
  // Add a log entry
  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, message]);
  };
  
  // Load Supabase script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.async = true;
    document.body.appendChild(script);
    
    addLog('Loading Supabase script...');
    
    return () => {
      // Cleanup if needed
      document.body.removeChild(script);
    };
  }, []);
  
  // Generate a project ID
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
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      addLog('Form submitted, processing...');
      
      // Get form data
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);
      const formValues: Record<string, any> = {};
      
      // Convert FormData to object
      formData.forEach((value, key) => {
        formValues[key] = value;
        addLog(`Form field: ${key} = ${value}`);
      });
      
      // Add selected color
      formValues.colorPreference = selectedColor;
      
      // Check if we have the required fields
      if (!formValues.fullName) {
        throw new Error('Full name is required');
      }
      
      // Generate project ID
      const newProjectId = generateProjectId(formValues.fullName);
      addLog(`Generated project ID: ${newProjectId}`);
      
      // Initialize Supabase
      if (!window.supabase) {
        throw new Error('Supabase library not loaded. Please refresh and try again.');
      }
      
      const SUPABASE_URL = 'https://aqicztygjpmunfljjuto.supabase.co';
      const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaWN6dHlnanBtdW5mbGpqdXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDU1ODIsImV4cCI6MjA1OTI4MTU4Mn0.5e2hvTckSSbTFLBjQiccrvjoBd6QQDX0X4tccFOc1rs';
      
      const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      addLog('Supabase client initialized');
      
      // Create records to insert
      const records = [
        {
          project_id: newProjectId,
          key: 'rendered_title',
          value: formValues.fullName
        },
        {
          project_id: newProjectId,
          key: 'client_name',
          value: formValues.fullName
        },
        {
          project_id: newProjectId,
          key: 'email_address',
          value: formValues.email || ''
        },
        {
          project_id: newProjectId,
          key: 'primary_color',
          value: selectedColor
        }
      ];
      
      // Add more records if we have them
      if (formValues.phone) {
        records.push({
          project_id: newProjectId,
          key: 'phone_number',
          value: formValues.phone
        });
      }
      
      // Insert records
      addLog(`Inserting ${records.length} records...`);
      
      let successCount = 0;
      let errorCount = 0;
      
      for (const record of records) {
        try {
          const { data, error } = await supabase
            .from('dynamic_content')
            .insert(record);
          
          if (error) {
            addLog(`Error inserting ${record.key}: ${error.message}`);
            errorCount++;
          } else {
            addLog(`Successfully inserted ${record.key}`);
            successCount++;
          }
        } catch (err) {
          addLog(`Exception inserting ${record.key}: ${(err as Error).message}`);
          errorCount++;
        }
      }
      
      addLog(`Insertion complete. Success: ${successCount}, Errors: ${errorCount}`);
      
      if (errorCount > 0 && successCount === 0) {
        throw new Error('Failed to save any data. Please try again.');
      }
      
      // Set project ID and show success message
      setProjectId(newProjectId);
      setFormSubmitted(true);
      
    } catch (error) {
      addLog(`Error: ${(error as Error).message}`);
      alert(`Error submitting form: ${(error as Error).message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle color selection
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    addLog(`Selected color: ${color}`);
  };
  
  // If form submitted, show thank you message
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
    <div>
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', border: '1px solid #ddd', borderRadius: '4px' }}>
        <h3>Debug Panel</h3>
        <button 
          onClick={() => {
            try {
              if (!window.supabase) {
                throw new Error('Supabase library not loaded');
              }
              
              const SUPABASE_URL = 'https://aqicztygjpmunfljjuto.supabase.co';
              const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaWN6dHlnanBtdW5mbGpqdXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDU1ODIsImV4cCI6MjA1OTI4MTU4Mn0.5e2hvTckSSbTFLBjQiccrvjoBd6QQDX0X4tccFOc1rs';
              
              const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
              addLog('Testing Supabase connection...');
              
              supabase
                .from('dynamic_content')
                .select('*')
                .limit(1)
                .then((result: any) => {
                  if (result.error) {
                    addLog(`Connection error: ${result.error.message}`);
                    alert(`Connection failed: ${result.error.message}`);
                  } else {
                    addLog(`Connection successful! Found ${result.data.length} records.`);
                    alert(`Connection successful! Found ${result.data.length} records.`);
                  }
                });
            } catch (error) {
              addLog(`Error: ${(error as Error).message}`);
              alert(`Error: ${(error as Error).message}`);
            }
          }}
          style={{ marginRight: '10px', padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Test Supabase Connection
        </button>
        
        <div style={{ marginTop: '10px', maxHeight: '200px', overflow: 'auto', background: '#212529', color: '#f8f9fa', padding: '10px', fontFamily: 'monospace', fontSize: '12px' }}>
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.formContainer}>
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
            <label htmlFor="profession">Profession/Title</label>
            <input type="text" id="profession" name="profession" required />
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
    </div>
  );
}
