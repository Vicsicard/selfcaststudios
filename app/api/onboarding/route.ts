import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration - these should be stored in environment variables in production
const SUPABASE_URL = 'https://aqicztygjpmunfljjjuto.supabase.co';
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
  // Create an array to hold all the records
  const records = [];
  
  // Current year for footer and other date-related fields
  const currentYear = new Date().getFullYear();
  
  // ======== STANDARD CONTENT EDITOR FIELDS ========
  
  // Personal Information - these match content editor fields
  if (formData.fullName) {
    records.push({
      project_id: projectId,
      key: 'rendered_title',
      value: formData.fullName
    });
    
    // Also store in client_name which is used in some templates
    records.push({
      project_id: projectId,
      key: 'client_name',
      value: formData.fullName
    });
  }
  
  if (formData.email) {
    records.push({
      project_id: projectId,
      key: 'email_address',
      value: formData.email
    });
  }
  
  if (formData.profession) {
    records.push({
      project_id: projectId,
      key: 'rendered_subtitle',
      value: formData.profession
    });
  }
  
  // Social Media - these match content editor fields
  if (formData.instagram) {
    records.push({
      project_id: projectId,
      key: 'instagram_url',
      value: formData.instagram
    });
  }
  
  if (formData.facebook) {
    records.push({
      project_id: projectId,
      key: 'facebook_url',
      value: formData.facebook
    });
  }
  
  if (formData.twitter) {
    records.push({
      project_id: projectId,
      key: 'twitter_url',
      value: formData.twitter
    });
  }
  
  if (formData.linkedin) {
    records.push({
      project_id: projectId,
      key: 'linkedin_url',
      value: formData.linkedin
    });
  }
  
  // Content Preferences
  if (formData.comfortableTopics) {
    records.push({
      project_id: projectId,
      key: 'rendered_bio_html',
      value: formData.comfortableTopics
    });
  }
  
  if (formData.writingStyle) {
    records.push({
      project_id: projectId,
      key: 'style_package',
      value: formData.writingStyle
    });
  }
  
  // Visual Branding - these match content editor fields
  if (formData.colorPreference) {
    records.push({
      project_id: projectId,
      key: 'primary_color',
      value: formData.colorPreference
    });
    
    // Also set a secondary color that's a lighter shade
    records.push({
      project_id: projectId,
      key: 'secondary_color',
      value: formData.colorPreference // We could calculate a lighter shade, but for now use the same color
    });
    
    // Add accent color as well
    records.push({
      project_id: projectId,
      key: 'accent_color',
      value: formData.colorPreference
    });
  }
  
  // Additional content editor fields
  if (formData.successDefinition) {
    records.push({
      project_id: projectId,
      key: 'rendered_bio_html_card_1',
      value: formData.successDefinition
    });
  }
  
  if (formData.contentGoals) {
    records.push({
      project_id: projectId,
      key: 'rendered_bio_html_card_2',
      value: formData.contentGoals
    });
  }
  
  if (formData.challenges) {
    records.push({
      project_id: projectId,
      key: 'rendered_bio_html_card_3',
      value: formData.challenges
    });
  }
  
  // Add standard fields that the content editor expects
  records.push({
    project_id: projectId,
    key: 'current_year',
    value: currentYear.toString()
  });
  
  // Add a default footer slogan
  records.push({
    project_id: projectId,
    key: 'rendered_footer_slogan',
    value: ` ${currentYear} ${formData.fullName || 'Client'} | All Rights Reserved`
  });
  
  // Add default quotes (these appear in many templates)
  records.push({
    project_id: projectId,
    key: 'quote_1',
    value: '"Success is not final, failure is not fatal: It is the courage to continue that counts."'
  });
  
  records.push({
    project_id: projectId,
    key: 'quote_2',
    value: '"The future belongs to those who believe in the beauty of their dreams."'
  });
  
  records.push({
    project_id: projectId,
    key: 'quote_3',
    value: '"The best way to predict the future is to create it."'
  });
  
  // ======== CUSTOM ONBOARDING FIELDS ========
  // These fields don't have direct mappings in the content editor
  // so we prefix them with 'onboarding_' to avoid conflicts
  
  if (formData.phone) {
    records.push({
      project_id: projectId,
      key: 'onboarding_phone',
      value: formData.phone
    });
  }
  
  if (formData.title) {
    records.push({
      project_id: projectId,
      key: 'onboarding_title',
      value: formData.title
    });
  }
  
  // Add metadata about when this project was created via onboarding
  records.push({
    project_id: projectId,
    key: 'onboarding_created_at',
    value: new Date().toISOString()
  });
  
  return records;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const formData = await request.json();
    console.log('Received form data:', formData);
    
    // Validate required fields
    if (!formData.fullName) {
      console.error('Missing required field: fullName');
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      );
    }
    
    // Generate a unique project ID
    const projectId = generateProjectId(formData.fullName);
    console.log('Generated project ID:', projectId);
    
    // Map form fields to content editor fields
    const contentRecords = mapFormFieldsToContentEditor(formData, projectId);
    console.log('Mapped content records:', contentRecords);
    
    // Insert data into Supabase
    console.log('Inserting data into Supabase...');
    
    try {
      // Insert each record individually for better error tracking
      let successCount = 0;
      let errorCount = 0;
      
      for (const record of contentRecords) {
        console.log(`Inserting record: ${record.key} for project ${projectId}`);
        
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
          { error: `Failed to save any data. Please try again.` },
          { status: 500 }
        );
      }
      
      // Return success response with the generated project ID
      return NextResponse.json({
        success: true,
        projectId,
        message: `Onboarding data saved successfully. Your project ID is: ${projectId}`,
        successCount,
        errorCount
      });
      
    } catch (supabaseError) {
      console.error('Supabase execution error:', supabaseError);
      return NextResponse.json(
        { error: 'Database error: ' + (supabaseError as Error).message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
