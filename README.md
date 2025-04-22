# Self Cast Studios

Modern web platform for Self Cast Studios built with Next.js, TypeScript, and Tailwind CSS.

## Features
- Modern, responsive design
- Video content integration
- Blog functionality
- E-commerce capabilities with Stripe
- SEO optimized
- Reliable onboarding form with Supabase integration

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. For testing the onboarding form directly (bypassing Stripe):
```
http://localhost:3000/test-onboarding
```

## Project Structure
- `/app` - Next.js app router pages and layouts
- `/components` - Reusable UI components
- `/lib` - Utility functions and configuration
- `/public` - Static assets
- `/styles` - Global styles and Tailwind configuration

## Recent Updates

### Reliable Onboarding Form (April 2025)
- Implemented a reliable onboarding form that properly connects to Supabase
- Generates unique project IDs in the format `lastname-firstname-YYYYMMDD-HHMM`
- Maps all form fields to appropriate database keys for the SelfCast Dynamic content editor
- Includes comprehensive error handling and logging
- Provides a professional thank you screen showing the project ID

### Testing
For local development and testing of the onboarding form:
1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:3000/test-onboarding`
3. Use the debug panel to test the Supabase connection
4. Fill out and submit the form
5. Check the logs in the debug panel to verify successful data insertion

### Data Mapping
The onboarding form maps user input to the following database keys:
- rendered_title
- client_name
- email_address
- rendered_subtitle
- social media URLs (instagram, facebook, twitter, linkedin)
- rendered_bio_html
- styling colors (primary, secondary, accent)
- bio cards (rendered_bio_html_card_1, 2, 3)
- current_year
- rendered_footer_slogan
- quotes (quote_1, 2, 3)
- onboarding_created_at

Each submission creates a unique project ID that connects all related records in the database.
