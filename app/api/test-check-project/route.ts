import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration - these should be stored in environment variables in production
const SUPABASE_URL = 'https://aqicztygjpmunfljjuto.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaWN6dHlnanBtdW5mbGpqdXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDU1ODIsImV4cCI6MjA1OTI4MTU4Mn0.5e2hvTckSSbTFLBjQiccrvjoBd6QQDX0X4tccFOc1rs';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function GET(request: NextRequest) {
  try {
    // Get the project ID from the query parameters
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    console.log('Checking project:', projectId);
    
    // Query the database for records with this project ID
    const { data, error } = await supabase
      .from('dynamic_content')
      .select('*')
      .eq('project_id', projectId);
    
    if (error) {
      console.error('Error querying database:', error);
      return NextResponse.json(
        { error: 'Failed to check project: ' + error.message },
        { status: 500 }
      );
    }
    
    console.log('Found records:', data?.length || 0);
    
    // Return the results
    return NextResponse.json({
      success: true,
      projectId,
      recordCount: data?.length || 0,
      records: data
    });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
