/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_PLACES_API_KEY?: string;
  readonly VITE_GOOGLE_PLACE_ID?: string;
  readonly VITE_GOOGLE_REVIEWS_EDGE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
