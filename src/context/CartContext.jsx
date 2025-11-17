import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // adjust path if needed

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // <-- get current logged-in user

  const storageKey = user ? `cart_${user.username}` : "cart_guest";

  // Load cart for the specific user
  const [cart, setCart] = useState(() => {
    const saved = sessionStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Reload cart when user changes (IMPORTANT!)
  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    setCart(saved ? JSON.parse(saved) : []);
  }, [user]);

  // Save cart whenever it changes
  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, storageKey]);

  const addToCart = (item) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const decrementFromCart = (id) => {
    const existing = cart.find((i) => i.id === id);
    if (!existing) return;

    if (existing.quantity > 1) {
      setCart(
        cart.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    } else {
      setCart(cart.filter((i) => i.id !== id));
    }
  };

  const removeFromCart = (id) => setCart(cart.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decrementFromCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
