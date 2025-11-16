// src/App.jsx
import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import RegisterPage from "./pages/RegisterPage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";

function App() {
  // Shared cart state
  const [cart, setCart] = useState([]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/menu" element={<MenuPage cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
