import StorefrontIcon from "@mui/icons-material/Storefront";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Stack, Typography } from "@mui/material";

export function AuthBranding() {
  return (
    <Link
      component={RouterLink}
      to="/shop"
      underline="none"
      sx={{ color: "inherit", display: "inline-flex" }}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap={1.5}
        sx={{ mb: 3 }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 1.25,
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <StorefrontIcon sx={{ color: "#000", fontSize: 28 }} />
        </Box>
        <Typography
          component="span"
          sx={{
            fontWeight: 700,
            fontSize: "1.5rem",
            letterSpacing: "-0.02em",
            color: "text.primary",
          }}
        >
          eSHOP
        </Typography>
      </Stack>
    </Link>
  );
}
