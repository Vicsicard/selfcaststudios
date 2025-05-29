# Self Cast Studios

Modern web platform for Self Cast Studios built with Next.js, TypeScript, and Tailwind CSS.

## Features
- Modern, responsive design
- Video content integration
- Blog functionality
- E-commerce capabilities with Stripe integration
- Payment success pages with marketing automation integration
- SEO optimized

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

## Project Structure
- `/app` - Next.js app router pages and layouts
  - `/app/payments/success` - Payment success pages for different products
  - `/app/api/payments` - API routes for payment verification
- `/components` - Reusable UI components
- `/lib` - Utility functions and configuration
- `/public` - Static assets
- `/styles` - Global styles and Tailwind configuration

## Payment Success Pages

The website includes dedicated success pages for each product in the marketing funnel:

1. **Bio Success Page** (`/payments/success/bio`)
   - Confirms purchase of the Professional Bio ($29)
   - Verifies payment with the marketing automation system
   - Triggers bio delivery email

2. **Content Kit Success Page** (`/payments/success/content-kit`)
   - Confirms purchase of the Content Starter Kit ($299)
   - Verifies payment with the marketing automation system
   - Triggers content kit delivery email

3. **Website Success Page** (`/payments/success/website`)
   - Confirms purchase of the Brand Website ($999)
   - Verifies payment with the marketing automation system
   - Initiates the website development process

## Marketing Automation Integration

The website integrates with the SelfCast Marketing Automation system to handle the customer journey:

1. **API Integration**
   - Payment success pages communicate with the marketing automation API
   - Stripe session verification ensures valid payments
   - Client records are updated in MongoDB

2. **Email Workflow**
   - Each successful payment triggers the appropriate email delivery
   - Follow-up emails are scheduled based on the client's stage
   - All test emails are sent to vicsicard@gmail.com when using the cherry-rich project

3. **Environment Configuration**
   - Set `MARKETING_AUTOMATION_URL` in `.env.local` to point to your marketing automation server
   - Set `MARKETING_AUTOMATION_API_KEY` for secure API communication
