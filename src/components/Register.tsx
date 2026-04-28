import { useEffect, useState, type FormEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/useAuth";
import { mapFirebaseAuthError } from "../lib/mapFirebaseAuthError";
import {
  type RegisterFieldErrors,
  type RegisterFieldKey,
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirm,
  validateRegisterForm,
  MIN_PASSWORD_LEN,
} from "../lib/registerFormValidation";
import { AuthBranding } from "./AuthBranding";

const cardSx = {
  width: "100%",
  maxWidth: 400,
  p: { xs: 2.5, sm: 3.5 },
  borderRadius: 0.5,
  border: "1px solid",
  borderColor: "grey.300",
  boxShadow: "none",
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 0.5,
    bgcolor: "background.paper",
    "& fieldset": {
      borderColor: "grey.900",
    },
    "&:hover fieldset": {
      borderColor: "grey.900",
    },
    "&.Mui-focused fieldset": {
      borderColor: "grey.900",
    },
  },
};

const primaryButtonSx = {
  py: 1.25,
  textTransform: "none" as const,
  fontWeight: 700,
  fontSize: "0.95rem",
  borderRadius: 0.5,
  bgcolor: "primary.main",
  color: "#000",
  boxShadow: "none",
  "&:hover": {
    bgcolor: "primary.dark",
    boxShadow: "none",
  },
};

const secondaryButtonSx = {
  py: 1.25,
  textTransform: "none" as const,
  fontWeight: 600,
  fontSize: "0.9rem",
  borderRadius: 0.5,
  bgcolor: "grey.200",
  color: "text.primary",
  border: "1px solid",
  borderColor: "grey.400",
  boxShadow: "none",
  "&:hover": {
    bgcolor: "grey.300",
    borderColor: "grey.500",
    boxShadow: "none",
  },
};

const legalTextSx = {
  color: "text.secondary",
  fontSize: "0.75rem",
  lineHeight: 1.5,
  textAlign: "center" as const,
};

export default function Register() {
  const navigate = useNavigate();
  const { user, authReady, signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  function clearFieldError(key: RegisterFieldKey) {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  useEffect(() => {
    if (authReady && user) {
      navigate("/shop", { replace: true });
    }
  }, [authReady, user, navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setApiError(null);
    const errs = validateRegisterForm({
      name,
      email,
      password,
      passwordConfirm,
    });
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setSubmitting(true);
    try {
      await signUp(name, email, password);
      navigate("/shop");
    } catch (err) {
      setApiError(mapFirebaseAuthError(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (!authReady) {
    return (
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.100",
        }}
      >
        <CircularProgress aria-label="Loading" />
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
        bgcolor: "grey.100",
      }}
    >
      <AuthBranding />

      <Card sx={cardSx} elevation={0}>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: 700, mb: 2.5, textAlign: "left" }}
        >
          Create account
        </Typography>

        <Stack
          component="form"
          spacing={2.25}
          noValidate
          onSubmit={handleSubmit}
        >
          {apiError ? <Alert severity="error">{apiError}</Alert> : null}

          <Stack spacing={0.5}>
            <Typography
              component="label"
              htmlFor="register-name"
              variant="body2"
              sx={{ fontWeight: 600 }}
            >
              Your name
            </Typography>
            <TextField
              id="register-name"
              name="name"
              type="text"
              autoComplete="name"
              fullWidth
              size="small"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearFieldError("name");
              }}
              onBlur={(e) => {
                const err = validateName(e.target.value);
                setFieldErrors((prev) => {
                  const next = { ...prev };
                  if (err) next.name = err;
                  else delete next.name;
                  return next;
                });
              }}
              error={Boolean(fieldErrors.name)}
              helperText={
                fieldErrors.name ?? "Letters and spaces, 2–80 characters."
              }
              disabled={submitting}
              sx={fieldSx}
              slotProps={{
                formHelperText: { sx: { m: 0, mt: 0.5 } },
              }}
            />
          </Stack>

          <Stack spacing={0.5}>
            <Typography
              component="label"
              htmlFor="register-email"
              variant="body2"
              sx={{ fontWeight: 600 }}
            >
              E-mail
            </Typography>
            <TextField
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              fullWidth
              size="small"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              onBlur={(e) => {
                const err = validateEmail(e.target.value);
                setFieldErrors((prev) => {
                  const next = { ...prev };
                  if (err) next.email = err;
                  else delete next.email;
                  return next;
                });
              }}
              error={Boolean(fieldErrors.email)}
              helperText={fieldErrors.email ?? "\u00a0"}
              disabled={submitting}
              sx={fieldSx}
              slotProps={{
                formHelperText: {
                  sx: { m: 0, mt: 0.5 },
                },
              }}
            />
          </Stack>

          <Stack spacing={0.5}>
            <Typography
              component="label"
              htmlFor="register-password"
              variant="body2"
              sx={{ fontWeight: 600 }}
            >
              Password
            </Typography>
            <TextField
              id="register-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              fullWidth
              size="small"
              value={password}
              onChange={(e) => {
                const nextPw = e.target.value;
                setPassword(nextPw);
                clearFieldError("password");
                clearFieldError("passwordConfirm");
              }}
              onBlur={(e) => {
                const pw = e.target.value;
                const pe = validatePassword(pw);
                const ce = validatePasswordConfirm(pw, passwordConfirm);
                setFieldErrors((prev) => {
                  const next = { ...prev };
                  if (pe) next.password = pe;
                  else delete next.password;
                  if (ce) next.passwordConfirm = ce;
                  else delete next.passwordConfirm;
                  return next;
                });
              }}
              error={Boolean(fieldErrors.password)}
              helperText={
                fieldErrors.password ??
                `At least ${MIN_PASSWORD_LEN} characters, with letters and numbers.`
              }
              disabled={submitting}
              sx={fieldSx}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword((v) => !v)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
                formHelperText: { sx: { m: 0, mt: 0.5 } },
              }}
            />
          </Stack>

          <Stack spacing={0.5}>
            <Typography
              component="label"
              htmlFor="register-password-confirm"
              variant="body2"
              sx={{ fontWeight: 600 }}
            >
              Re-enter password
            </Typography>
            <TextField
              id="register-password-confirm"
              name="passwordConfirm"
              type={showPasswordConfirm ? "text" : "password"}
              autoComplete="new-password"
              fullWidth
              size="small"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                clearFieldError("passwordConfirm");
              }}
              onBlur={(e) => {
                const err = validatePasswordConfirm(password, e.target.value);
                setFieldErrors((prev) => {
                  const next = { ...prev };
                  if (err) next.passwordConfirm = err;
                  else delete next.passwordConfirm;
                  return next;
                });
              }}
              error={Boolean(fieldErrors.passwordConfirm)}
              helperText={
                fieldErrors.passwordConfirm ?? "Must match password above."
              }
              disabled={submitting}
              sx={fieldSx}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        aria-label={
                          showPasswordConfirm
                            ? "Hide password confirmation"
                            : "Show password confirmation"
                        }
                        onClick={() => setShowPasswordConfirm((v) => !v)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                        size="small"
                      >
                        {showPasswordConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
                formHelperText: { sx: { m: 0, mt: 0.5 } },
              }}
            />
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disableElevation
            disabled={submitting}
            sx={primaryButtonSx}
            startIcon={
              submitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
          >
            Create your eShop account
          </Button>

          <Typography sx={legalTextSx}>
            By creating an account you agree to the eShop Website Conditions of
            Use &amp; Sale. Please see our Privacy Notice, our Cookies Notice
            and our Interest-Based Ads Notice.
          </Typography>

          <Button
            component={RouterLink}
            to="/login"
            fullWidth
            variant="contained"
            disableElevation
            disabled={submitting}
            sx={secondaryButtonSx}
          >
            Already have an account? Sign in
          </Button>
        </Stack>
      </Card>

    
    </Box>
  );
}
