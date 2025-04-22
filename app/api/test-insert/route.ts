import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration - these should be stored in environment variables in production
const SUPABASE_URL = 'https://aqicztygjpmunfljjjuto.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaWN6dHlnanBtdW5mbGpqdXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDU1ODIsImV4cCI6MjA1OTI4MTU4Mn0.5e2hvTckSSbTFLBjQiccrvjoBd6QQDX0X4tccFOc1rs';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function GET(request: NextRequest) {
  try {
    // Generate a test project ID with proper timestamp format
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:.]/g, '').substring(0, 14);
    const testProjectId = `test-project-${timestamp}`;
    
    console.log('Generated test project ID:', testProjectId);
    
    // Create a set of test records that match content editor fields
    const testRecords = [
      // Basic information
      {
        project_id: testProjectId,
        key: 'rendered_title',
        value: 'Test Client ' + now.toISOString()
      },
      {
        project_id: testProjectId,
        key: 'client_name',
        value: 'Test Client'
      },
      {
        project_id: testProjectId,
        key: 'rendered_subtitle',
        value: 'Test Profession'
      },
      {
        project_id: testProjectId,
        key: 'rendered_bio_html',
        value: 'This is a test bio created by the API test endpoint.'
      },
      
      // Style information
      {
        project_id: testProjectId,
        key: 'style_package',
        value: 'professional-his'
      },
      {
        project_id: testProjectId,
        key: 'primary_color',
        value: '#4a6fa5'
      },
      {
        project_id: testProjectId,
        key: 'secondary_color',
        value: '#6c8eb4'
      },
      {
        project_id: testProjectId,
        key: 'accent_color',
        value: '#17a2b8'
      },
      
      // Standard fields
      {
        project_id: testProjectId,
        key: 'current_year',
        value: now.getFullYear().toString()
      },
      {
        project_id: testProjectId,
        key: 'rendered_footer_slogan',
        value: ` ${now.getFullYear()} Test Client | All Rights Reserved`
      },
      
      // Contact information
      {
        project_id: testProjectId,
        key: 'email_address',
        value: 'test@example.com'
      },
      
      // Social media
      {
        project_id: testProjectId,
        key: 'linkedin_url',
        value: 'https://linkedin.com/in/testuser'
      },
      
      // Custom onboarding fields
      {
        project_id: testProjectId,
        key: 'onboarding_created_at',
        value: now.toISOString()
      },
      {
        project_id: testProjectId,
        key: 'onboarding_test',
        value: 'This is a test record from the API endpoint'
      }
    ];
    
    console.log('Inserting test records:', testRecords);
    
    // Insert each record individually
    let successCount = 0;
    let errorCount = 0;
    
    for (const record of testRecords) {
      console.log(`Inserting record: ${record.key} for project ${testProjectId}`);
      
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
      return NextResponse.json(
        { error: `Failed to insert any test records. Please check the database connection.` },
        { status: 500 }
      );
    }
    
    // Now try to read back the records to verify they were inserted
    const { data: readData, error: readError } = await supabase
      .from('dynamic_content')
      .select('*')
      .eq('project_id', testProjectId);
    
    if (readError) {
      console.error('Error reading back test records:', readError);
      return NextResponse.json(
        { 
          warning: 'Records were inserted but could not be read back: ' + readError.message,
          projectId: testProjectId,
          successCount,
          errorCount
        },
        { status: 207 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Test records inserted successfully',
      projectId: testProjectId,
      successCount,
      errorCount,
      records: readData
    });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
