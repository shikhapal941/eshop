/** Client-side rules for the register form (Firebase still enforces on the server). */

export const MIN_PASSWORD_LEN = 6;
export const MAX_PASSWORD_LEN = 128;
export const MIN_NAME_LEN = 2;
export const MAX_NAME_LEN = 80;

/** Simple, practical format check (same idea as browsers’ type="email"). */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type RegisterFieldKey = "name" | "email" | "password" | "passwordConfirm";

export type RegisterFieldErrors = Partial<Record<RegisterFieldKey, string>>;

export function validateName(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "Enter your name.";
  }
  if (trimmed.length < MIN_NAME_LEN) {
    return `Use at least ${MIN_NAME_LEN} characters.`;
  }
  if (trimmed.length > MAX_NAME_LEN) {
    return `Use at most ${MAX_NAME_LEN} characters.`;
  }
  return null;
}

export function validateEmail(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "Enter your email.";
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return "Enter a valid email address.";
  }
  return null;
}

/** Matches Firebase Auth default (min length); adds a reasonable max and basic strength. */
export function validatePassword(raw: string): string | null {
  if (!raw) {
    return "Enter a password.";
  }
  if (raw.length < MIN_PASSWORD_LEN) {
    return `Use at least ${MIN_PASSWORD_LEN} characters.`;
  }
  if (raw.length > MAX_PASSWORD_LEN) {
    return `Use at most ${MAX_PASSWORD_LEN} characters.`;
  }
  if (!/[a-zA-Z]/.test(raw)) {
    return "Include at least one letter.";
  }
  if (!/[0-9]/.test(raw)) {
    return "Include at least one number.";
  }
  return null;
}

export function validatePasswordConfirm(
  password: string,
  passwordConfirm: string,
): string | null {
  if (!passwordConfirm) {
    return "Confirm your password.";
  }
  if (password !== passwordConfirm) {
    return "Passwords do not match.";
  }
  return null;
}

export type RegisterValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export function validateRegisterForm(values: RegisterValues): RegisterFieldErrors {
  const errors: RegisterFieldErrors = {};

  const nameErr = validateName(values.name);
  if (nameErr) errors.name = nameErr;

  const emailErr = validateEmail(values.email);
  if (emailErr) errors.email = emailErr;

  const passErr = validatePassword(values.password);
  if (passErr) errors.password = passErr;

  const confirmErr = validatePasswordConfirm(
    values.password,
    values.passwordConfirm,
  );
  if (confirmErr) errors.passwordConfirm = confirmErr;

  return errors;
}

/** Sign-in only: do not require complexity rules (existing accounts may differ). */
export type LoginFieldKey = "email" | "password";

export type LoginFieldErrors = Partial<Record<LoginFieldKey, string>>;

export function validatePasswordForSignIn(raw: string): string | null {
  if (!raw) {
    return "Enter your password.";
  }
  if (raw.length > MAX_PASSWORD_LEN) {
    return `Use at most ${MAX_PASSWORD_LEN} characters.`;
  }
  return null;
}

export function validateLoginForm(values: {
  email: string;
  password: string;
}): LoginFieldErrors {
  const errors: LoginFieldErrors = {};
  const emailErr = validateEmail(values.email);
  if (emailErr) errors.email = emailErr;
  const passErr = validatePasswordForSignIn(values.password);
  if (passErr) errors.password = passErr;
  return errors;
}
