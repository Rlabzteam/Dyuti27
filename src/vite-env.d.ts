/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYMENT_API_URL?: string;
  readonly VITE_VORTEXX_API_KEY?: string;
  readonly VITE_VORTEXX_API_SECRET?: string;
  readonly VITE_VORTEXX_EVENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
