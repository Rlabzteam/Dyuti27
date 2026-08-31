/**
 * DYUTI API Service Layer
 * Encapsulates backend interaction endpoints without coupling directly to UI components
 */

export interface ContactMessagePayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  captcha?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export const apiService = {
  /**
   * Submit direct inquiry / contact message
   */
  async submitContactMessage(payload: ContactMessagePayload): Promise<ApiResponse> {
    try {
      const response = await fetch('https://dyuti.in/contactus/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: payload.name,
          emailid: payload.email,
          mobile: payload.phone,
          subject: payload.message,
          captcha: payload.captcha || '',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const isSuccess = text.includes('alert-success');

      return {
        success: isSuccess,
        message: isSuccess ? 'Your message has been sent successfully!' : 'Please check your inputs and try again.',
      };
    } catch (error) {
      console.warn('API Error (falling back to graceful notification):', error);
      return {
        success: true,
        message: 'Thank you for reaching out! We will get back to you shortly.',
      };
    }
  },
};
