'use client'

import { useState, useEffect } from 'react'
import styles from '../onboarding/styles.module.css'

export default function TestConnection() {
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const testConnection = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/test-supabase');
      const data = await response.json();
      
      setTestResult(data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to test connection');
      }
    } catch (err) {
      console.error('Error testing connection:', err);
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const testDirectSubmission = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create test data for a direct submission
      const testData = {
        fullName: 'Test User ' + Date.now(),
        email: 'test@example.com',
        profession: 'Developer',
        colorPreference: 'blue'
      };
      
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });
      
      const data = await response.json();
      setTestResult(data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit test data');
      }
    } catch (err) {
      console.error('Error submitting test data:', err);
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className={styles.container}>
      <h1>Supabase Connection Test</h1>
      
      <div className={styles.formSection}>
        <h2>Test Connection to Supabase</h2>
        <p>Click the button below to test the connection to Supabase.</p>
        
        <button 
          onClick={testConnection}
          className={styles.submitBtn}
          disabled={isLoading}
        >
          {isLoading ? 'Testing...' : 'Test Supabase Connection'}
        </button>
        
        <button 
          onClick={testDirectSubmission}
          className={styles.submitBtn}
          disabled={isLoading}
          style={{ marginTop: '20px' }}
        >
          {isLoading ? 'Submitting...' : 'Test Direct Form Submission'}
        </button>
        
        {error && (
          <div className={styles.errorMessage}>
            <p>{error}</p>
          </div>
        )}
        
        {testResult && (
          <div className={styles.successMessage}>
            <h3>Test Result:</h3>
            <pre>{JSON.stringify(testResult, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
