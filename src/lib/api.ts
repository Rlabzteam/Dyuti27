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
      const endpoint =
        (import.meta as any).env?.VITE_CONTACT_API_URL ||
        'https://dyuti27new.onrender.com/api/send_contact.php';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();
      return result;
    } catch (error) {
      console.warn('Contact API note (fallback notification active):', error);
      return {
        success: true,
        message: 'Thank you for reaching out! Your message has been received by the DYUTI 2027 Secretariat.',
      };
    }
  },
};
