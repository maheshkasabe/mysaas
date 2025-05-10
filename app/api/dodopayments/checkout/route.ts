import { dodopayments } from "@/lib/dodopayments";
import { NextRequest, NextResponse } from "next/server";

// List of valid country codes for Dodo Payments
const VALID_COUNTRY_CODES = [
  'US', 'GB', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'IN'
] as const;

type CountryCode = typeof VALID_COUNTRY_CODES[number];

function isValidCountryCode(code: string): code is CountryCode {
  return VALID_COUNTRY_CODES.includes(code as CountryCode);
}

// Get the base URL for the application
function getBaseUrl() {
  if (process.env.NEXT_SITE_URL) {
    return process.env.NEXT_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://localhost:3000';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { 
      productId, 
      email, 
      name, 
      city, 
      country, 
      state, 
      street, 
      zipcode,
    } = body;

    // Validate required fields
    if (!productId || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate and set country code
    const countryCode = isValidCountryCode(country?.toUpperCase() || '') 
      ? country.toUpperCase() 
      : 'US'; // Default to US if invalid or missing

    const baseUrl = getBaseUrl();
    const returnUrl = `${baseUrl}/payment/success`;

    const response = await dodopayments.subscriptions.create({
      billing: {
        city: city || '',
        country: countryCode,
        state: state || '',
        street: street || '',
        zipcode: zipcode || '',
      },
      customer: {
        email: email,
        name: name || email.split('@')[0],
      },
      payment_link: true,
      product_id: productId,
      quantity: 1,
      return_url: returnUrl,
    });

    if (!response.payment_link) {
      throw new Error('No payment link received from Dodo Payments');
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}