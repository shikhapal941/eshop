export type Product = {
  id: number;
  name: string;
  color: string;
  rating: number;
  description: string;
  images: string[];
  price: number;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Aurora Smart Watch",
    color: "Midnight Black",
    rating: 4.8,
    description:
      "Track workouts, calls, and daily goals with a sleek finish. Color: Midnight Black.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=80",
    ],
    price: 199,
  },
  {
    id: 2,
    name: "Nova Wireless Headphones",
    color: "Pearl White",
    rating: 4.6,
    description:
      "Enjoy immersive sound, soft ear cushions, and long battery life. Color: Pearl White.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
    ],
    price: 129,
  },
  {
    id: 3,
    name: "Pixel Pro Camera",
    color: "Silver Mist",
    rating: 4.9,
    description:
      "Capture sharp photos and cinematic videos with an easy travel-friendly body. Color: Silver Mist.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764ce7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=900&q=80",
    ],
    price: 899,
  },
  {
    id: 4,
    name: "Urban Travel Backpack",
    color: "Forest Green",
    rating: 4.7,
    description:
      "Carry your laptop, charger, and essentials in a compact everyday style. Color: Forest Green.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    ],
    price: 79,
  },
  {
    id: 5,
    name: "Glow Desk Lamp",
    color: "Warm Beige",
    rating: 4.5,
    description:
      "Brighten your workspace with adjustable light levels and a modern shape. Color: Warm Beige.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80",
    ],
    price: 45,
  },
  {
    id: 6,
    name: "Flex Running Shoes",
    color: "Ocean Blue",
    rating: 4.4,
    description:
      "Move comfortably with breathable mesh, soft cushioning, and flexible grip. Color: Ocean Blue.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
    ],
    price: 95,
  },
  {
    id: 7,
    name: "Classic Leather Wallet",
    color: "Cocoa Brown",
    rating: 4.3,
    description:
      "Keep cards and cash organized in a slim premium finish for daily use. Color: Cocoa Brown.",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    ],
    price: 35,
  },
];
