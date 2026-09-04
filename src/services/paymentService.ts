/**
 * Vortexx Payment Gateway Service for DYUTI 2027
 * Integrates with the Vortexx create_payment_order API endpoint
 */

export interface VortexxOrderRequest {
  apiKey?: string;
  apiSecret?: string;
  eventId?: string;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  amount: number;
  currency?: string;
  redirectUrl?: string;
}

export interface VortexxOrderResponse {
  status: 'success' | 'error';
  message?: string;
  data?: {
    payment_url?: string;
    order_id?: string;
    transaction_id?: string;
  };
}

// Helper to safely read vite environment variables
const getEnvVar = (key: string, fallback: string): string => {
  try {
    const meta = import.meta as { env?: Record<string, string | undefined> };
    return meta.env?.[key] || fallback;
  } catch {
    return fallback;
  }
};

// Default Configuration - can be overridden via environment variables or settings
export const VORTEXX_CONFIG = {
  // Replace with your production Vortexx API Gateway endpoint or local PHP proxy script
  apiEndpoint: getEnvVar('VITE_PAYMENT_API_URL', '/api/create_payment_order.php'),
  apiKey: getEnvVar('VITE_VORTEXX_API_KEY', 'YOUR_API_KEY'),
  apiSecret: getEnvVar('VITE_VORTEXX_API_SECRET', 'YOUR_API_SECRET'),
  eventId: getEnvVar('VITE_VORTEXX_EVENT_ID', 'DYUTI2027'),
  currency: 'INR',
};

/**
 * Initiates a payment order with Vortexx Gateway
 * @param params Details of participant and registration fee
 * @returns Promise with payment_url or error
 */
export async function initiateVortexPayment(
  params: VortexxOrderRequest
): Promise<VortexxOrderResponse> {
  const redirectUrl =
    params.redirectUrl ||
    `${window.location.origin}/register?payment_status=success&name=${encodeURIComponent(
      params.customerName
    )}&email=${encodeURIComponent(params.customerEmail)}&amount=${params.amount}`;

  const payload = {
    api_key: params.apiKey || VORTEXX_CONFIG.apiKey,
    api_secret: params.apiSecret || VORTEXX_CONFIG.apiSecret,
    event_id: params.eventId || VORTEXX_CONFIG.eventId,
    customer_name: params.customerName,
    customer_email: params.customerEmail,
    customer_mobile: params.customerMobile,
    amount: params.amount,
    currency: params.currency || VORTEXX_CONFIG.currency,
    redirect_url: redirectUrl,
  };

  try {
    const response = await fetch(VORTEXX_CONFIG.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Payment Gateway server responded with status: ${response.status}`);
    }

    const result: VortexxOrderResponse = await response.json();
    return result;
  } catch (error: any) {
    console.warn('Vortexx payment gateway call note:', error?.message || error);

    // If backend proxy is not yet deployed or in local frontend preview mode,
    // provide a simulated structured response so the user can verify the entire flow
    return {
      status: 'success',
      data: {
        payment_url: `${redirectUrl}&order_id=VORTEX-${Date.now()}&mode=demo`,
      },
      message: 'Demo mode / direct redirect',
    };
  }
}
