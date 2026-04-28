import { FirebaseError } from "firebase/app";

export function mapFirebaseAuthError(err: unknown): string {
  if (err instanceof FirebaseError) {
    let text: string;
    switch (err.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
        text = "Incorrect email or password.";
        break;
      case "auth/user-not-found":
        text = "No account with this email. Create an account first.";
        break;
      case "auth/invalid-email":
        text = "Enter a valid email address.";
        break;
      case "auth/user-disabled":
        text = "This account has been disabled.";
        break;
      case "auth/email-already-in-use":
        text = "This email is already registered. Sign in instead.";
        break;
      case "auth/weak-password":
        text = "Password is too weak. Use at least 6 characters.";
        break;
      case "auth/operation-not-allowed":
        text =
          "Email/password sign-in is off. Firebase Console → Authentication → Sign-in method → enable Email/Password (first toggle), then save.";
        break;
      case "auth/unauthorized-domain":
        text =
          "This browser address is not allowed for sign-in. Firebase Console → Authentication → Settings → Authorized domains: add localhost, 127.0.0.1, or your deployed host (depending on how you open the site).";
        break;
      case "auth/invalid-api-key":
        text =
          "API key rejected. Check `.env` values match Firebase → Project settings → Your apps (web). In Google Cloud → APIs & Credentials, ensure this key isn’t restricted in a way that blocks Identity Toolkit.";
        break;
      case "auth/too-many-requests":
        text = "Too many attempts. Try again in a few minutes.";
        break;
      case "auth/network-request-failed":
        text = "Network error. Check your connection and try again.";
        break;
      default:
        text = err.message || "Something went wrong. Try again.";
    }
    return `${text} (Code: ${err.code})`;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "Something went wrong. Try again.";
}
