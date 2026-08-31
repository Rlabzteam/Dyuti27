export const DEFAULT_REGISTRATION_URL = 'https://forms.gle/XTZZmXS1tjkvfm9u6';

export function getRegistrationUrl(source?: string): string {
  if (!source) return DEFAULT_REGISTRATION_URL;
  return `${DEFAULT_REGISTRATION_URL}?utm_source=${encodeURIComponent(source)}`;
}
