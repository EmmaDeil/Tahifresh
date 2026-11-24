import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { products } from '../data/products';
import type { CartItem, Product } from '../types';

type CartContextType = {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: number) => void;
  setQty: (id: number, q: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved: CartItem[] = JSON.parse(localStorage.getItem('tahifresh-cart') || '[]');
      // Re-sync name/price/etc. with current catalogue and drop unknown or invalid items
      return saved.flatMap((s) => {
        const p = products.find((x) => x.id === s.id);
        const quantity = Math.floor(Number(s.quantity));
        return p && quantity >= 1 ? [{ ...p, quantity }] : [];
      });
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('tahifresh-cart', JSON.stringify(items));
  }, [items]);

  const add = (p: Product) =>
    setItems((xs) =>
      xs.some((x) => x.id === p.id)
        ? xs.map((x) => (x.id === p.id ? { ...x, quantity: x.quantity + 1 } : x))
        : [...xs, { ...p, quantity: 1 }]
    );

  const remove = (id: number) =>
    setItems((xs) => xs.filter((x) => x.id !== id));

  const setQty = (id: number, q: number) =>
    q < 1
      ? remove(id)
      : setItems((xs) => xs.map((x) => (x.id === id ? { ...x, quantity: q } : x)));

  const value = useMemo(
    () => ({
      items,
      add,
      remove,
      setQty,
      clear: () => setItems([]),
      count: items.reduce((a, x) => a + x.quantity, 0),
      subtotal: items.reduce((a, x) => a + x.quantity * x.price, 0),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error('useCart must be used within CartProvider');
  return c;
};
