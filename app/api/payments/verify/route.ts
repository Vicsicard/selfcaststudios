import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

const MARKETING_AUTOMATION_URL = process.env.MARKETING_AUTOMATION_URL || 'http://localhost:3001';
const API_KEY = process.env.MARKETING_AUTOMATION_API_KEY || 'development-api-key';

/**
 * Verify a payment session with the marketing automation system
 * This acts as a bridge between the website success pages and the marketing automation backend
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, client_id, product_type } = body;

    if (!session_id || !client_id || !product_type) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Validate product type
    const validProducts = ['bio', 'content_kit', 'website', 'subscription'];
    if (!validProducts.includes(product_type)) {
      return NextResponse.json(
        { error: 'Invalid product type' },
        { status: 400 }
      );
    }

    console.log(`[Payment Verify] Verifying ${product_type} payment for client ${client_id}`);

    // Forward the verification request to the marketing automation system
    const response = await fetch(`${MARKETING_AUTOMATION_URL}/api/payments/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        session_id,
        client_id,
        product_type,
        source: 'website'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[Payment Verify] Error from marketing automation:', errorData);
      
      return NextResponse.json(
        { error: 'Failed to verify payment with marketing automation system' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('[Payment Verify] Success response:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('[Payment Verify] Error processing payment verification:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
