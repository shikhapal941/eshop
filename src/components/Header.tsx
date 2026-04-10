import SearchIcon from "@mui/icons-material/Search";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const SEARCH_INPUT_MIN_HEIGHT = 54;

function HeaderAccountLinks() {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        flexShrink: 0,
        alignItems: "flex-start",
        gap: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Stack sx={{ minWidth: 0, gap: 0.5 }}>
        <Typography
          variant="body2"
          component="p"
          sx={{
            color: "grey.300",
            lineHeight: 1.3,
            fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "0.9375rem" },
            m: 0,
          }}
        >
          Hello, guest
        </Typography>
        <Button
          component="a"
          href="#"
          variant="text"
          color="inherit"
          sx={{
            textTransform: "none",
            p: 0,
            minWidth: 0,
            justifyContent: "flex-start",
            fontWeight: 600,
            fontSize: { xs: "0.9375rem", sm: "1rem", md: "1.0625rem" },
            letterSpacing: "0.01em",
            lineHeight: 1.2,
          }}
        >
          Sign in
        </Button>
      </Stack>

      <Stack sx={{ minWidth: 0, gap: 0.5 }}>
        <Typography
          variant="body2"
          component="p"
          sx={{
            color: "grey.300",
            lineHeight: 1.3,
            fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "0.9375rem" },
            m: 0,
          }}
        >
          Your shop
        </Typography>
        <Button
          component="a"
          href="#"
          variant="text"
          color="inherit"
          sx={{
            textTransform: "none",
            p: 0,
            minWidth: 0,
            justifyContent: "flex-start",
            fontWeight: 600,
            fontSize: { xs: "0.9375rem", sm: "1rem", md: "1.0625rem" },
            letterSpacing: "0.01em",
            lineHeight: 1.2,
          }}
        >
          Shop
        </Button>
      </Stack>
    </Stack>
  );
}

export function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#000",
        color: "common.white",
        borderBottom: "1px solid",
        borderColor: "grey.900",
      }}
    >
      <Box
        sx={{
          maxWidth: 1600,
          mx: "auto",
          width: "100%",
          px: { xs: 2.5, sm: 4, md: 5, lg: 6 },
          py: { xs: 2, sm: 2.25, md: 2.5 },
        }}
      >
        <Stack
          sx={{
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            gap: { xs: 2, md: 3, lg: 4 },
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: { xs: "100%", md: "auto" },
              flexShrink: 0,
              gap: { xs: 2, sm: 3 },
              minWidth: 0,
              pr: { md: 1 },
            }}
          >
            <Stack
              sx={{
                flexDirection: "column",
                flexShrink: 0,
                alignItems: "center",
                lineHeight: 1.15,
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: { xs: 48, sm: 52, md: 56 },
                  height: { xs: 48, sm: 52, md: 56 },
                  borderRadius: 1.25,
                  bgcolor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <StorefrontIcon
                  sx={{ color: "#000", fontSize: { xs: 28, sm: 30, md: 32 } }}
                />
              </Box>
              <Typography
                component="span"
                variant="h6"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "common.white",
                  fontSize: { xs: "1.05rem", sm: "1.2rem", md: "1.35rem" },
                }}
              >
                eShop
              </Typography>
            </Stack>

            <Box sx={{ display: { xs: "block", md: "none" }, flexShrink: 0 }}>
              <HeaderAccountLinks />
            </Box>
          </Stack>

          <TextField
            placeholder="Search products, brands, categories..."
            aria-label="Search the store"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              flex: { md: "1 1 auto" },
              minWidth: { md: 280 },
              width: { xs: "100%", md: "auto" },
              maxWidth: { md: "none" },
              "& .MuiOutlinedInput-root": {
                bgcolor: "#fff",
                borderRadius: 1.25,
                pl: { xs: 1.5, sm: 2, md: 2.5 },
                pr: 0,
                minHeight: SEARCH_INPUT_MIN_HEIGHT,
                alignItems: "stretch",
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                  borderWidth: 2,
                },
              },
              "& .MuiInputBase-input": {
                color: "#111",
                py: 1.25,
                fontSize: { xs: "1rem", sm: "1.0625rem" },
                "&::placeholder": {
                  color: "#616161",
                  opacity: 1,
                },
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      m: 0,
                      ml: 0,
                      mr: 0,
                      maxHeight: "none",
                      height: SEARCH_INPUT_MIN_HEIGHT,
                      alignSelf: "center",
                    }}
                  >
                    <IconButton
                      type="button"
                      aria-label="Submit search"
                      disableRipple
                      edge={false}
                      sx={{
                        alignSelf: "stretch",
                        height: SEARCH_INPUT_MIN_HEIGHT,
                        width: { xs: 56, sm: 60, md: 64 },
                        minWidth: { xs: 56, sm: 60, md: 64 },
                        px: 0,
                        py: 0,
                        borderRadius: 0,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        bgcolor: "primary.main",
                        color: "common.white",
                        "&:hover": {
                          bgcolor: "primary.dark",
                        },
                      }}
                    >
                      <SearchIcon
                        sx={{
                          fontSize: { xs: 28, sm: 30, md: 32 },
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box
            sx={{
              display: { xs: "none", md: "block" },
              flexShrink: 0,
              pl: { md: 1, lg: 2 },
            }}
          >
            <HeaderAccountLinks />
          </Box>
        </Stack>
      </Box>
    </AppBar>
  );
}
