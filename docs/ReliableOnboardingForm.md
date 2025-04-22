# ReliableOnboardingForm Documentation

## Overview

The ReliableOnboardingForm is a robust implementation that ensures reliable data submission from the Self Cast Studios onboarding process to the Supabase database. This component addresses previous issues with data loss and ensures that all client information is properly stored with the correct keys for the SelfCast Dynamic content editor.

## Key Features

### 1. Direct Supabase Integration
- Loads Supabase client-side via CDN using the `next/script` component with `afterInteractive` strategy
- Initializes the Supabase client with proper configuration
- Implements connection testing to verify database connectivity before form submission

### 2. Project ID Generation
- Format: `lastname-firstname-YYYYMMDD-HHMM`
- Example: `smith-john-20250421-1545`
- Creates unique IDs for each submission
- Consistent with existing system for easy reference and chronological sorting

### 3. Complete Data Mapping
- Maps all form fields to appropriate database keys
- Creates multiple records with the same project_id but different keys
- Includes essential fields like rendered_title, email_address, bio, quotes, etc.

### 4. Debugging Features
- Comprehensive logging system that tracks each step of the process
- Debug panel in development mode for easy troubleshooting
- Connection testing functionality to verify Supabase connectivity

### 5. Error Handling
- Tracks success/failure for each record insertion
- Provides detailed error messages
- Implements fallback mechanisms

## Implementation Details

### Supabase Integration
The form uses the Supabase JavaScript client loaded from CDN to directly connect to the database. This approach ensures compatibility with the SelfCast Dynamic content editor, which uses the same method.

```javascript
<Script
  src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
  strategy="afterInteractive"
  onLoad={() => {
    console.log('[SUCCESS] Supabase script loaded successfully');
    initializeSupabase();
  }}
/>
```

### Project ID Generation
The form generates a unique project ID for each submission based on the client's name and the current timestamp:

```javascript
const generateProjectId = (fullName: string): string => {
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
};
```

### Data Mapping
The form maps user input to the appropriate database keys using a dedicated function:

```javascript
const mapFormFieldsToContentEditor = (formData: any, projectId: string) => {
  const records = [];
  
  // Map name fields
  if (formData.fullName) {
    records.push({
      project_id: projectId,
      key: 'rendered_title',
      value: formData.fullName
    });
    records.push({
      project_id: projectId,
      key: 'client_name',
      value: formData.fullName
    });
  }
  
  // Map additional fields...
  
  return records;
};
```

## Testing

For local development and testing:

1. Start the development server:
   ```
   npm run dev
   ```

2. Navigate to the test page:
   ```
   http://localhost:3000/test-onboarding
   ```

3. Use the debug panel to test the Supabase connection

4. Fill out and submit the form

5. Check the logs in the debug panel to verify successful data insertion

## Database Structure

Each form submission creates multiple records in the `dynamic_content` table with the following structure:

```
{
  project_id: string, // Unique identifier for the client (e.g., smith-john-20250421-1545)
  key: string,        // Field name in the content editor (e.g., rendered_title)
  value: string       // Value from the form (e.g., "John Smith")
}
```

## Deployment Considerations

When deploying to production:

1. Ensure Supabase environment variables are properly configured:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. Test the form in the production environment to verify connectivity

3. Monitor initial submissions to ensure data is being properly stored

## Troubleshooting

If issues occur:

1. Check the browser console for detailed logs
2. Verify Supabase credentials are correct
3. Test the connection using the debug panel
4. Check for any network issues that might prevent the form from connecting to Supabase
