import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useCart } from "../context/useCart";

const AMAZON_ORANGE = "#f0c14b";
const AMAZON_ORANGE_BORDER = "#a88734";

const amazonButtonSx = {
  py: 1,
  px: 2,
  textTransform: "none" as const,
  fontWeight: 600,
  borderRadius: 1,
  color: "#111",
  bgcolor: AMAZON_ORANGE,
  border: `1px solid ${AMAZON_ORANGE_BORDER}`,
  backgroundImage: "linear-gradient(to bottom, #f7dfa5, #f0c14b)",
  "&:hover": {
    bgcolor: "#f0c14b",
    backgroundImage: "linear-gradient(to bottom, #f5e4a8, #e7b93a)",
  },
};

const sectionBackground =
  "linear-gradient(180deg, #f5f7fb 0%, #ffffff 45%, #f7f9fc 100%)";

export default function Checkout() {
  const { lines, removeFromBasket, itemCount, subtotal } = useCart();
  const [gift, setGift] = useState(false);

  return (
    <Box component="main" sx={{ minHeight: "100%" }}>
      <Box
        sx={{
          background: `
            linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.35) 100%),
            url(https://images.unsplash.com/photo-1503602642458-232111445475?auto=format&fit=crop&w=1800&q=60)
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, md: 2.5 },
        }}
      >
        <Box component="section" sx={{ maxWidth: 1600, mx: "auto" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{
                flexWrap: "wrap",
                alignItems: { xs: "flex-start", md: "center" },
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  maxWidth: 280,
                }}
              >
                Exclusive offer for eShop customers
              </Typography>
              <Button sx={{ ...amazonButtonSx, minWidth: 120 }}>Learn more</Button>
            </Stack>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.65rem",
                maxWidth: 220,
                lineHeight: 1.4,
                display: { xs: "none", lg: "block" },
              }}
            >
              Sample offer copy. T&amp;Cs apply.
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Box
        component="section"
        sx={{
          px: { xs: 2.5, sm: 4, md: 5, lg: 6 },
          py: { xs: 5, md: 7 },
          background: sectionBackground,
        }}
      >
        <Box sx={{ maxWidth: 1600, mx: "auto", width: "100%" }}>
          <Stack spacing={1.5} sx={{ mb: 4 }}>
            <Typography
              variant="overline"
              sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.18em" }}
            >
              Basket
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#101828",
                fontSize: { xs: "2rem", md: "2.75rem" },
              }}
            >
              Your shopping basket
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 760,
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.05rem" },
                lineHeight: 1.7,
              }}
            >
              Review items you added from featured products, adjust quantities on the
              product page, and continue when you are ready.
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            sx={{ alignItems: "flex-start" }}
          >
            <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
              <Stack spacing={3}>
                {lines.length === 0 ? (
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: "rgba(15, 23, 42, 0.08)",
                      p: 4,
                      backgroundColor: "#fff",
                      boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
                    }}
                  >
                    <Typography color="text.secondary">
                      Your basket is empty. Add products from the home page.
                    </Typography>
                  </Card>
                ) : (
                  lines.map((line) => {
                    const lineTotal = line.price * line.quantity;
                    return (
                      <Card
                        key={line.productId}
                        elevation={0}
                        sx={{
                          borderRadius: 4,
                          border: "1px solid",
                          borderColor: "rgba(15, 23, 42, 0.08)",
                          overflow: "hidden",
                          backgroundColor: "#fff",
                          boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
                        }}
                      >
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          sx={{ alignItems: { xs: "stretch", sm: "stretch" } }}
                        >
                          <Box
                            sx={{
                              flexShrink: 0,
                              width: { xs: "100%", sm: 240 },
                              bgcolor: "#f8fafc",
                              p: 2,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              component="img"
                              src={line.image}
                              alt=""
                              sx={{
                                width: "100%",
                                maxWidth: 220,
                                height: 200,
                                objectFit: "cover",
                                borderRadius: 3,
                              }}
                            />
                          </Box>
                          <Box sx={{ p: 3, flex: 1, minWidth: 0 }}>
                            <Stack spacing={2}>
                              <Box>
                                <Typography
                                  variant="h5"
                                  sx={{
                                    fontWeight: 700,
                                    color: "#111827",
                                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                                    lineHeight: 1.35,
                                  }}
                                >
                                  {line.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ mt: 0.75, color: "text.secondary" }}
                                >
                                  Qty: {line.quantity} · ${line.price} each
                                </Typography>
                              </Box>
                              <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                  alignItems: "center",
                                  flexWrap: "wrap",
                                  justifyContent: "space-between",
                                  gap: 1,
                                }}
                              >
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}
                                >
                                  <Rating
                                    value={line.rating}
                                    precision={0.1}
                                    readOnly
                                  />
                                  <Typography sx={{ fontWeight: 700, color: "#111827" }}>
                                    {line.rating.toFixed(1)}
                                  </Typography>
                                </Stack>
                                <Typography
                                  sx={{
                                    fontWeight: 800,
                                    color: "#111827",
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  ${lineTotal}
                                </Typography>
                              </Stack>
                              <Box>
                                <Button
                                  onClick={() => removeFromBasket(line.productId)}
                                  sx={{
                                    ...amazonButtonSx,
                                    boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset",
                                  }}
                                >
                                  Remove from basket
                                </Button>
                              </Box>
                            </Stack>
                          </Box>
                        </Stack>
                      </Card>
                    );
                  })
                )}
              </Stack>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", md: 340 },
                flexShrink: 0,
                position: { md: "sticky" },
                top: { md: 24 },
              }}
            >
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "rgba(15, 23, 42, 0.08)",
                  p: 3,
                  backgroundColor: "#fff",
                  boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
                }}
              >
                <Typography
                  sx={{
                    color: "#111827",
                    mb: 1.5,
                    fontSize: "1.15rem",
                    fontWeight: 700,
                  }}
                >
                  Subtotal ({itemCount} item{itemCount === 1 ? "" : "s"}):{" "}
                  <Box component="span" sx={{ fontWeight: 800 }}>
                    ${subtotal}
                  </Box>
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={gift}
                      onChange={(_, c) => setGift(c)}
                      size="small"
                    />
                  }
                  label="This order contains a gift"
                  sx={{
                    m: 0,
                    mb: 2,
                    alignItems: "flex-start",
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.875rem",
                      color: "text.secondary",
                      pt: 0.25,
                    },
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    py: 1.35,
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  Proceed to checkout
                </Button>
              </Card>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
