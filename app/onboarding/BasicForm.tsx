'use client'

import React, { useState } from 'react'
import styles from './styles.module.css'

export default function BasicForm() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [projectId, setProjectId] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a simple project ID
    const now = new Date();
    const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    
    // Get the name from the form
    const formData = new FormData(e.target as HTMLFormElement);
    const fullName = formData.get('fullName') as string || 'user';
    const nameParts = fullName.toLowerCase().trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : 'unknown';
    
    // Set the project ID
    const newProjectId = `${lastName}-${firstName}-${timestamp}`;
    setProjectId(newProjectId);
    
    // Show the thank you popup
    setShowThankYou(true);
    
    // Log for debugging
    console.log('Form submitted, showing thank you popup');
    console.log('Project ID:', newProjectId);
  };
  
  if (showThankYou) {
    return (
      <>
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
        ></div>
        <div 
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            maxWidth: '600px',
            width: '90%',
            textAlign: 'center'
          }}
        >
          <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Thank You!</h2>
          <p style={{ marginBottom: '1rem' }}>Your information has been submitted successfully. We're excited to start working on your personal brand!</p>
          
          <div 
            style={{ 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px', 
              padding: '1.5rem', 
              margin: '1.5rem 0',
              borderLeft: '4px solid #007bff'
            }}
          >
            <p><strong>Your Project ID:</strong> {projectId}</p>
            <p style={{ fontSize: '0.9rem', color: '#6c757d', fontStyle: 'italic' }}>
              Please save this ID for your records. It will be used to identify your project in our system.
            </p>
          </div>
          
          <p>You should receive a confirmation email shortly with details about your scheduled workshop and next steps.</p>
          <p>Your personal brand website is being set up and will be available soon. We'll notify you when it's ready for your review.</p>
          <p>If you have any questions in the meantime, please contact us at <a href="mailto:hello@selfcaststudios.com">hello@selfcaststudios.com</a>.</p>
        </div>
      </>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
        <input 
          type="text" 
          name="fullName" 
          required 
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            border: '1px solid #ddd', 
            borderRadius: '4px' 
          }} 
        />
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
        <input 
          type="email" 
          name="email" 
          required 
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            border: '1px solid #ddd', 
            borderRadius: '4px' 
          }} 
        />
      </div>
      
      <button 
        type="submit" 
        style={{ 
          backgroundColor: '#007bff', 
          color: 'white', 
          padding: '0.75rem 1.5rem', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Submit Form
      </button>
    </form>
  );
}
