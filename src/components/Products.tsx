import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useCart } from "../context/useCart";
import { type Product, products } from "../data/catalog";

function groupProducts(items: Product[]) {
  const grouped: Product[][] = [];
  const cardsPerRow = [2, 3];
  let currentIndex = 0;
  let rowNumber = 0;

  while (currentIndex < items.length) {
    const rowSize = cardsPerRow[rowNumber % cardsPerRow.length];
    grouped.push(items.slice(currentIndex, currentIndex + rowSize));
    currentIndex += rowSize;
    rowNumber += 1;
  }

  return grouped;
}

export function Products() {
  const { addToBasket } = useCart();
  const productRows = groupProducts(products);

  return (
    <Box
      component="section"
      sx={{
        px: { xs: 2.5, sm: 4, md: 5, lg: 6 },
        py: { xs: 5, md: 7 },
        background:
          "linear-gradient(180deg, #f5f7fb 0%, #ffffff 45%, #f7f9fc 100%)",
      }}
    >
      <Box sx={{ maxWidth: 1600, mx: "auto", width: "100%" }}>
        <Stack spacing={1.5} sx={{ mb: 4 }}>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.18em" }}
          >
            Featured products
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#101828",
              fontSize: { xs: "2rem", md: "2.75rem" },
            }}
          >
            Trending picks for your basket
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
            Browse product cards with images, quick details, rating stars, and a fast
            add-to-basket action.
          </Typography>
        </Stack>

        <Stack spacing={3}>
          {productRows.map((row, rowIndex) => (
            <Box
              key={`row-${rowIndex + 1}`}
              sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: {
                  xs: "1fr",
                  md: `repeat(${row.length}, minmax(0, 1fr))`,
                },
              }}
            >
              {row.map((product) => (
                <Card
                  key={product.id}
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "rgba(15, 23, 42, 0.08)",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      overflowX: "auto",
                      scrollSnapType: "x mandatory",
                      px: 2,
                      pt: 2,
                      pb: 1,
                      bgcolor: "#f8fafc",
                      "&::-webkit-scrollbar": {
                        height: 8,
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(15, 23, 42, 0.22)",
                        borderRadius: 999,
                      },
                    }}
                  >
                    {product.images.map((image, index) => (
                      <Box
                        key={`${product.id}-${index + 1}`}
                        component="img"
                        src={image}
                        alt={`${product.name} preview ${index + 1}`}
                        sx={{
                          minWidth: "100%",
                          width: "100%",
                          height: 240,
                          objectFit: "cover",
                          borderRadius: 3,
                          flexShrink: 0,
                          scrollSnapAlign: "start",
                        }}
                      />
                    ))}
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2.25} sx={{ height: "100%" }}>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
                      >
                        <Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: "#111827",
                              fontSize: { xs: "1.2rem", md: "1.35rem" },
                            }}
                          >
                            {product.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ mt: 0.75, color: "text.secondary", lineHeight: 1.7 }}
                          >
                            {product.description}
                          </Typography>
                        </Box>

                        <IconButton
                          aria-label={`Save ${product.name}`}
                          sx={{
                            border: "1px solid",
                            borderColor: "rgba(15, 23, 42, 0.1)",
                            bgcolor: "#fff",
                          }}
                        >
                          <FavoriteBorderIcon fontSize="small" />
                        </IconButton>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        sx={{
                          alignItems: "center",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          useFlexGap
                          sx={{ alignItems: "center", flexWrap: "wrap" }}
                        >
                          <Rating value={product.rating} precision={0.1} readOnly />
                          <Typography sx={{ fontWeight: 700, color: "#111827" }}>
                            {product.rating.toFixed(1)}
                          </Typography>
                          <Typography sx={{ color: "text.secondary" }}>
                            color: {product.color}
                          </Typography>
                        </Stack>
                        <Typography
                          sx={{
                            fontWeight: 800,
                            color: "#111827",
                            fontSize: "1.15rem",
                          }}
                        >
                          ${product.price}
                        </Typography>
                      </Stack>

                      <Box sx={{ pt: 1, mt: "auto" }}>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => addToBasket(product)}
                          sx={{
                            py: 1.35,
                            borderRadius: 999,
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: "1rem",
                          }}
                        >
                          Add to Basket
                        </Button>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ))}
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4.5 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              textTransform: "none",
              borderRadius: 999,
              px: 4,
              py: 1.1,
              fontWeight: 700,
            }}
          >
            See More
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
