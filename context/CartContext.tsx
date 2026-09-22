import React, { createContext, useContext, useMemo, useState } from 'react';
import { Book, CartItem } from '../data';

interface CartContextValue {
  items: CartItem[];
  count: number;
  addToCart: (book: Book) => void;
  changeQuantity: (bookId: string, delta: number) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (book: Book) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
  };

  const changeQuantity = (bookId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.book.id === bookId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({ items, count, addToCart, changeQuantity }),
    [items, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart phải được gọi bên trong CartProvider');
  }
  return ctx;
}
