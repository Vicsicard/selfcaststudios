import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration - these should be stored in environment variables in production
const SUPABASE_URL = 'https://aqicztygjpmunfljjuto.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxaWN6dHlnanBtdW5mbGpqdXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDU1ODIsImV4cCI6MjA1OTI4MTU4Mn0.5e2hvTckSSbTFLBjQiccrvjoBd6QQDX0X4tccFOc1rs';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Generate a unique project ID based on the client's name and current timestamp
 * Format: lastname-firstname-YYYYMMDD-HHMM
 */
function generateProjectId(fullName: string): string {
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
}

/**
 * Map onboarding form fields to content editor fields
 */
function mapFormFieldsToContentEditor(formData: any, projectId: string) {
  const mappings = [
    // Personal Information
    { form: 'fullName', content: 'rendered_title' },
    { form: 'email', content: 'email_address' },
    { form: 'profession', content: 'rendered_subtitle' },
    
    // Social Media
    { form: 'instagram', content: 'instagram_url' },
    { form: 'facebook', content: 'facebook_url' },
    { form: 'twitter', content: 'twitter_url' },
    { form: 'linkedin', content: 'linkedin_url' },
    
    // Content Preferences
    { form: 'comfortableTopics', content: 'rendered_bio_html' },
    { form: 'writingStyle', content: 'style_package' },
    
    // Visual Branding
    { form: 'colorPreference', content: 'color_scheme' },
    
    // Professional Background
    { form: 'title', content: 'professional_title' },
    
    // Additional fields can be mapped to bio cards
    { form: 'successDefinition', content: 'rendered_bio_html_card_1' },
    { form: 'contentGoals', content: 'rendered_bio_html_card_2' },
    { form: 'challenges', content: 'rendered_bio_html_card_3' },
    
    // Footer content
    { form: 'phone', content: 'contact_phone' },
  ];
  
  // Create records for Supabase insertion
  const records = mappings.map(mapping => {
    const value = formData[mapping.form];
    if (value) {
      return {
        project_id: projectId,
        key: mapping.content,
        value: value
      };
    }
    return null;
  }).filter(record => record !== null);
  
  // Add a default footer slogan
  records.push({
    project_id: projectId,
    key: 'rendered_footer_slogan',
    value: `© ${new Date().getFullYear()} ${formData.fullName} | All Rights Reserved`
  });
  
  return records;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const formData = await request.json();
    
    // Generate a unique project ID
    const projectId = generateProjectId(formData.fullName);
    
    // Map form fields to content editor fields
    const contentRecords = mapFormFieldsToContentEditor(formData, projectId);
    
    // Insert data into Supabase
    const { error } = await supabase
      .from('dynamic_content')
      .upsert(contentRecords, {
        onConflict: 'project_id,key'
      });
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save onboarding data' },
        { status: 500 }
      );
    }
    
    // Return success response with the generated project ID
    return NextResponse.json({
      success: true,
      projectId,
      message: 'Onboarding data saved successfully'
    });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
