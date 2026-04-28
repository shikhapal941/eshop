import { createContext } from "react";
import type { Product } from "../data/catalog";

export type CartLine = {
  productId: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  quantity: number;
};

export type CartContextValue = {
  lines: CartLine[];
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

export const CartContext = createContext<CartContextValue | null>(null);
