'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function TestOnboardingPage() {
  const router = useRouter()
  
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '50px auto', 
      padding: '20px', 
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Test Onboarding Form</h1>
      
      <p style={{ marginBottom: '20px' }}>
        This page is for testing the onboarding form directly without going through the Stripe payment flow.
      </p>
      
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '15px' }}>Local Development Links</h2>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px' 
        }}>
          <Link 
            href="/onboarding" 
            style={{
              display: 'inline-block',
              padding: '12px 20px',
              backgroundColor: '#4a90e2',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Go to Onboarding Form
          </Link>
          
          <button 
            onClick={() => router.push('/onboarding')}
            style={{
              padding: '12px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Navigate to Onboarding Form (Button)
          </button>
        </div>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '15px' }}>Direct HTML Test File</h2>
        
        <p style={{ marginBottom: '15px' }}>
          You can also use the standalone HTML test file we created earlier:
        </p>
        
        <a 
          href="/direct-supabase-test.html" 
          target="_blank"
          style={{
            display: 'inline-block',
            padding: '12px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          Open Direct Supabase Test
        </a>
      </div>
      
      <div>
        <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '15px' }}>Testing Instructions</h2>
        
        <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Click one of the links above to access the onboarding form</li>
          <li>Use the debug panel at the top to test the Supabase connection</li>
          <li>Fill out the form with test data</li>
          <li>Submit the form and check the logs in the debug panel</li>
          <li>Verify that records are created in Supabase with the correct project ID</li>
        </ol>
      </div>
    </div>
  )
}
