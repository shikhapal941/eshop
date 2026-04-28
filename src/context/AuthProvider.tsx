import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type Auth,
  type User,
} from "firebase/auth";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  clearStoredSessionStart,
  getStoredSessionStart,
  isStoredSessionExpired,
  MAX_AUTH_SESSION_MS,
  setStoredSessionStart,
} from "../lib/authSession";
import { getFirebaseAuth } from "../lib/firebase";
import { AuthContext, type AuthContextValue } from "./authContext";

function enforceMaxSessionAndSignOut(auth: Auth) {
  const u = auth.currentUser;
  if (!u) return;
  if (!isStoredSessionExpired()) return;
  clearStoredSessionStart();
  void signOut(auth);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(
    () => getFirebaseAuth() == null,
  );

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      return;
    }

    const unsub = onAuthStateChanged(auth, (next) => {
      void (async () => {
        if (!next) {
          clearStoredSessionStart();
          setUser(null);
          setAuthReady(true);
          return;
        }

        const start = getStoredSessionStart();
        if (start == null) {
          setStoredSessionStart();
        } else if (Date.now() - start > MAX_AUTH_SESSION_MS) {
          clearStoredSessionStart();
          await signOut(auth);
          setUser(null);
          setAuthReady(true);
          return;
        }

        setUser(next);
        setAuthReady(true);
      })();
    });

    const tick = () => enforceMaxSessionAndSignOut(auth);

    const intervalId = window.setInterval(tick, 60 * 1000);

    const onVisible = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      unsub();
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const auth = getFirebaseAuth();
      if (!auth) {
        throw new Error("Firebase is not configured. Add VITE_FIREBASE_* to your .env file.");
      }
      await signInWithEmailAndPassword(auth, email.trim(), password);
    },
    [],
  );

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      const auth = getFirebaseAuth();
      if (!auth) {
        throw new Error("Firebase is not configured. Add VITE_FIREBASE_* to your .env file.");
      }
      const displayName = name.trim();
      const cred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      if (displayName) {
        try {
          await updateProfile(cred.user, { displayName });
        } catch {
          // Account exists; profile name is optional UX.
        }
      }
    },
    [],
  );

  const signOutUser = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) {
      return;
    }
    clearStoredSessionStart();
    await signOut(auth);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      authReady,
      signIn,
      signUp,
      signOutUser,
    }),
    [user, authReady, signIn, signUp, signOutUser],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
