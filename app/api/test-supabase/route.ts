import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = 'https://aqicztygjpmunfljjuto.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaWN6dHlnanBtdW5mbGpqdXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDU1ODIsImV4cCI6MjA1OTI4MTU4Mn0.5e2hvTckSSbTFLBjQiccrvjoBd6QQDX0X4tccFOc1rs';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function GET(request: NextRequest) {
  try {
    // Test connection by querying for existing projects
    const { data, error } = await supabase
      .from('dynamic_content')
      .select('project_id')
      .limit(10);
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to connect to Supabase: ' + error.message },
        { status: 500 }
      );
    }
    
    // Create a test record
    const testProjectId = 'test-connection-' + Date.now();
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
      return NextResponse.json(
        { error: 'Failed to insert test record: ' + insertError.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      existingProjects: data?.map(item => item.project_id) || [],
      testProjectCreated: testProjectId
    });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
