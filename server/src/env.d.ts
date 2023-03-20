/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_JWT_SECRET: string;
  readonly VITE_DATABASE_URI: string;
  readonly VITE_DOMAIN_NAME: string;
  readonly VITE_HOST_URL: string;
  readonly VITE_MAILGUN_KEY: string;
  readonly VITE_MAILGUN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
