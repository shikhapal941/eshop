/**
 * Client-side max session length. Firebase ID tokens refresh often (~1h); this is an
 * extra app rule: after this wall-clock window from first sign-in in this browser,
 * we sign the user out. (Enforcement is best-effort in the browser, not tamper-proof.)
 */
export const MAX_AUTH_SESSION_MS = 2 * 24 * 60 * 60 * 1000;

const STORAGE_KEY = "eshop_auth_session_start_ms";

export function getStoredSessionStart(): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw == null) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export function setStoredSessionStart(now = Date.now()): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(now));
  } catch {
    // private mode / quota
  }
}

export function clearStoredSessionStart(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function isStoredSessionExpired(): boolean {
  const start = getStoredSessionStart();
  if (start == null) return false;
  return Date.now() - start > MAX_AUTH_SESSION_MS;
}
