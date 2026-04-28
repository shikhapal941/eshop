import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
} as const;

function missingKeys(): string[] {
  const keys: (keyof typeof config)[] = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ];
  return keys.filter((k) => !String(config[k] ?? "").trim());
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let warnedMissingEnv = false;

export function isFirebaseAuthConfigured(): boolean {
  return missingKeys().length === 0;
}

/**
 * Returns Firebase Auth, or `null` if VITE_FIREBASE_* env vars are not set.
 */
export function getFirebaseAuth(): Auth | null {
  if (!isFirebaseAuthConfigured()) {
    if (import.meta.env.DEV && !warnedMissingEnv) {
      warnedMissingEnv = true;
      const missing = missingKeys();
      console.warn(
        `[firebase] Missing env: ${missing.join(", ")}. Add a .env file (see .env.example). Auth UI will not work until configured.`,
      );
    }
    return null;
  }
  if (!app) {
    app = getApps().length > 0 ? getApps()[0]! : initializeApp({ ...config });
    auth = getAuth(app);
  }
  return auth;
}
