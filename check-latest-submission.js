// Script to check the latest submission in Supabase
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://aqicztygjpmunfljjuto.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaWN6dHlnanBtdW5mbGpqdXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDU1ODIsImV4cCI6MjA1OTI4MTU4Mn0.5e2hvTckSSbTFLBjQiccrvjoBd6QQDX0X4tccFOc1rs';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkLatestSubmission() {
  try {
    console.log('Checking for recent submissions...');
    
    // Get the current date
    const now = new Date();
    
    // Get date from 1 hour ago
    const oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000));
    const formattedDate = oneHourAgo.toISOString();
    
    // Query for records with onboarding_created_at in the last hour
    const { data, error } = await supabase
      .from('dynamic_content')
      .select('project_id, key, value')
      .eq('key', 'onboarding_created_at')
      .gt('value', formattedDate)
      .order('value', { ascending: false });
    
    if (error) {
      console.error('Error querying Supabase:', error);
      return;
    }
    
    if (!data || data.length === 0) {
      console.log('No recent submissions found in the last hour.');
      
      // Try looking for any submissions with onboarding_created_at
      const { data: anyData, error: anyError } = await supabase
        .from('dynamic_content')
        .select('project_id, key, value')
        .eq('key', 'onboarding_created_at')
        .order('value', { ascending: false })
        .limit(5);
      
      if (anyError) {
        console.error('Error querying for any submissions:', anyError);
        return;
      }
      
      if (!anyData || anyData.length === 0) {
        console.log('No submissions found at all with onboarding_created_at key.');
        return;
      }
      
      console.log('Found older submissions:');
      anyData.forEach(record => {
        console.log(`Project ID: ${record.project_id}, Created: ${record.value}`);
      });
      
      // Check details for the most recent project
      const latestProjectId = anyData[0].project_id;
      await checkProjectDetails(latestProjectId);
      
      return;
    }
    
    console.log('Recent submissions found:');
    data.forEach(record => {
      console.log(`Project ID: ${record.project_id}, Created: ${record.value}`);
    });
    
    // Check details for the most recent project
    const latestProjectId = data[0].project_id;
    await checkProjectDetails(latestProjectId);
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

async function checkProjectDetails(projectId) {
  console.log(`\nChecking details for project: ${projectId}`);
  
  try {
    const { data, error } = await supabase
      .from('dynamic_content')
      .select('key, value')
      .eq('project_id', projectId);
    
    if (error) {
      console.error('Error querying project details:', error);
      return;
    }
    
    if (!data || data.length === 0) {
      console.log('No records found for this project.');
      return;
    }
    
    console.log(`Found ${data.length} records for project ${projectId}:`);
    
    // Group data by categories for better readability
    const categories = {
      'Personal Info': ['rendered_title', 'client_name', 'rendered_subtitle', 'email_address'],
      'Content': ['rendered_bio_html', 'rendered_bio_html_card_1', 'rendered_bio_html_card_2', 'rendered_bio_html_card_3'],
      'Social Media': ['facebook_url', 'twitter_url', 'instagram_url', 'linkedin_url'],
      'Styling': ['primary_color', 'secondary_color', 'accent_color', 'style_package'],
      'Metadata': ['onboarding_created_at', 'current_year', 'rendered_footer_slogan'],
      'Other': []
    };
    
    // Sort data into categories
    const categorizedData = {};
    data.forEach(record => {
      let assigned = false;
      
      for (const [category, keys] of Object.entries(categories)) {
        if (keys.includes(record.key)) {
          if (!categorizedData[category]) categorizedData[category] = [];
          categorizedData[category].push(record);
          assigned = true;
          break;
        }
      }
      
      if (!assigned) {
        if (!categorizedData['Other']) categorizedData['Other'] = [];
        categorizedData['Other'].push(record);
      }
    });
    
    // Print categorized data
    for (const [category, records] of Object.entries(categorizedData)) {
      if (records && records.length > 0) {
        console.log(`\n--- ${category} ---`);
        records.forEach(record => {
          // Truncate long values for readability
          const value = record.value && record.value.length > 100 
            ? record.value.substring(0, 100) + '...' 
            : record.value;
          console.log(`${record.key}: ${value}`);
        });
      }
    }
    
  } catch (error) {
    console.error('Unexpected error checking project details:', error);
  }
}

checkLatestSubmission();
