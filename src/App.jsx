// src/App.jsx
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import ManageFoodPage from "./pages/ManageFoodPage";
import AddFoodPage from "./pages/AddFoodPage";
import EditFoodPage from "./pages/EditFoodPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/foods/manage" element={
              <ProtectedRoute role="manager">
                <ManageFoodPage />
              </ProtectedRoute>
            }/>
            <Route path="/foods/add" element={
              <ProtectedRoute role="manager">
                <AddFoodPage />
              </ProtectedRoute>
            }/>
            <Route path="/foods/edit/:uuid" element={
              <ProtectedRoute role="manager">
                <EditFoodPage />
              </ProtectedRoute>
            }/>
            <Route path="/foods/:uuid" element={<ItemDetailsPage />} />
          </Routes>
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
