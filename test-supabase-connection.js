// Simple script to test Supabase connection
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration - using the same values from the API routes
const SUPABASE_URL = 'https://aqicztygjpmunfljjjuto.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaWN6dHlnanBtdW5mbGpqdXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDU1ODIsImV4cCI6MjA1OTI4MTU4Mn0.5e2hvTckSSbTFLBjQiccrvjoBd6QQDX0X4tccFOc1rs';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test connection by querying for existing projects
    const { data, error } = await supabase
      .from('dynamic_content')
      .select('project_id')
      .limit(5);
    
    if (error) {
      console.error('Supabase error:', error);
      return;
    }
    
    console.log('Connection successful!');
    console.log('Sample projects:', data.map(item => item.project_id));
    
    // Try to insert a test record
    const testProjectId = 'test-connection-' + Date.now();
    console.log('Attempting to insert test record with project ID:', testProjectId);
    
    const { error: insertError } = await supabase
      .from('dynamic_content')
      .insert([
        {
          project_id: testProjectId,
          key: 'test_key',
          value: 'Test value created at ' + new Date().toISOString()
        }
      ]);
    
    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return;
    }
    
    console.log('Test record inserted successfully!');
    
    // Verify the record was inserted
    const { data: verifyData, error: verifyError } = await supabase
      .from('dynamic_content')
      .select('*')
      .eq('project_id', testProjectId)
      .eq('key', 'test_key');
    
    if (verifyError) {
      console.error('Verification error:', verifyError);
      return;
    }
    
    console.log('Verification successful:', verifyData);
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testConnection();
