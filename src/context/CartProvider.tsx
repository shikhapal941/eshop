import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../data/catalog";
import {
  CartContext,
  type CartContextValue,
  type CartLine,
} from "./cartContext";

function productToImage(product: Product) {
  return product.images[0] ?? "";
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addToBasket = useCallback((product: Product) => {
    setLines((prev) => {
      const found = prev.find((l) => l.productId === product.id);
      if (found) {
        return prev.map((l) =>
          l.productId === product.id ? { ...l, quantity: l.quantity + 1 } : l,
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          rating: product.rating,
          image: productToImage(product),
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromBasket = useCallback((productId: number) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const { itemCount, subtotal } = useMemo(() => {
    let count = 0;
    let sub = 0;
    for (const line of lines) {
      count += line.quantity;
      sub += line.price * line.quantity;
    }
    return { itemCount: count, subtotal: sub };
  }, [lines]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      addToBasket,
      removeFromBasket,
      clearCart,
      itemCount,
      subtotal,
    }),
    [lines, addToBasket, removeFromBasket, clearCart, itemCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
