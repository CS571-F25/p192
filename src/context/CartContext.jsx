import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // get current logged-in user

  const storageKey = user ? `cart_${user.username}` : "cart_guest";

  // Load cart for the specific user
  const [cart, setCart] = useState(() => {
    const saved = sessionStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Reload cart when user changes
  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    setCart(saved ? JSON.parse(saved) : []);
  }, [user]);

  // Save cart whenever it changes
  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, storageKey]);

  const addToCart = (item) => {
    const existing = cart.find((i) => i.uuid === item.uuid);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.uuid === item.uuid ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const decrementFromCart = (uuid) => {
    const existing = cart.find((i) => i.uuid === uuid);
    if (!existing) return;

    if (existing.quantity > 1) {
      setCart(
        cart.map((i) =>
          i.uuid === uuid ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    } else {
      setCart(cart.filter((i) => i.uuid !== uuid));
    }
  };

  const removeFromCart = (uuid) => setCart(cart.filter((i) => i.uuid !== uuid));
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decrementFromCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
