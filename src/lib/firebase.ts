import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import { getAuth, type Auth } from "firebase/auth";

const baseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
} as const;

function firebaseConfig(): Record<string, string> {
  const mid = String(
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "",
  ).trim();
  return mid === ""
    ? { ...baseConfig }
    : { ...baseConfig, measurementId: mid };
}

function missingKeys(): string[] {
  const keys: (keyof typeof baseConfig)[] = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ];
  return keys.filter((k) => !String(baseConfig[k] ?? "").trim());
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let analytics: Analytics | null = null;
let warnedMissingEnv = false;

export function isFirebaseAuthConfigured(): boolean {
  return missingKeys().length === 0;
}

function ensureApp(): FirebaseApp | null {
  if (!isFirebaseAuthConfigured()) {
    return null;
  }
  if (!app) {
    app = getApps().length > 0 ? getApps()[0]! : initializeApp(firebaseConfig());
    auth = getAuth(app);
  }
  return app;
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
  ensureApp();
  return auth;
}

/**
 * Initializes Google Analytics for Firebase when `VITE_FIREBASE_MEASUREMENT_ID` is set.
 * Safe to call once at app startup; returns `null` if Analytics is not configured.
 */
export function getFirebaseAnalytics(): Analytics | null {
  if (!isFirebaseAuthConfigured()) return null;
  const mid = String(
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "",
  ).trim();
  if (!mid) return null;
  const a = ensureApp();
  if (!a) return null;
  if (!analytics) {
    analytics = getAnalytics(a);
  }
  return analytics;
}
