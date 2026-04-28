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
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/useAuth";
import {
  type LoginFieldErrors,
  type LoginFieldKey,
  validateEmail,
  validateLoginForm,
  validatePasswordForSignIn,
} from "../lib/registerFormValidation";
import { mapFirebaseAuthError } from "../lib/mapFirebaseAuthError";
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

export default function Login() {
  const navigate = useNavigate();
  const { user, authReady, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function clearFieldError(key: LoginFieldKey) {
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
    const errs = validateLoginForm({ email, password });
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setSubmitting(true);
    try {
      await signIn(email, password);
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
          Sign-in
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
              htmlFor="login-email"
              variant="body2"
              sx={{ fontWeight: 600 }}
            >
              E-mail
            </Typography>
            <TextField
              id="login-email"
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
                formHelperText: { sx: { m: 0, mt: 0.5 } },
              }}
            />
          </Stack>

          <Stack spacing={0.5}>
            <Typography
              component="label"
              htmlFor="login-password"
              variant="body2"
              sx={{ fontWeight: 600 }}
            >
              Password
            </Typography>
            <TextField
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              fullWidth
              size="small"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearFieldError("password");
              }}
              onBlur={(e) => {
                const err = validatePasswordForSignIn(e.target.value);
                setFieldErrors((prev) => {
                  const next = { ...prev };
                  if (err) next.password = err;
                  else delete next.password;
                  return next;
                });
              }}
              error={Boolean(fieldErrors.password)}
              helperText={
                fieldErrors.password ?? "The password you use for this account."
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
            Sign-in
          </Button>

          <Typography sx={legalTextSx}>
            By signing-in you agree to the eShop Website Conditions of Use
            &amp; Sale. Please see our Privacy Notice, our Cookies Notice and
            our Interest-Based Ads Notice.
          </Typography>

          <Button
            component={RouterLink}
            to="/register"
            fullWidth
            variant="contained"
            disableElevation
            disabled={submitting}
            sx={secondaryButtonSx}
          >
            Create your eShop Accountsdfsdfsdfsdfsfsdf
          </Button>
        </Stack>
      </Card>

      
    </Box>
  );
}
