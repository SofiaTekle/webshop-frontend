import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import type { CartItem, Product } from "./types/product";
import CartPage from "./pages/CartPage";

import AdminRoute from "./components/AdminRoute";
import AdminProductPage from "./pages/AdminProductPage";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };
    setCartItems((currentItem) => [...currentItem, cartItem]);

    alert(`${product.name} har lagts i kundvagnen`);
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/products" element={<ProductPage onAdd={addToCart} />} />
          <Route path="/cart" element={<CartPage items={cartItems} />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/products" element={<AdminProductPage />} />
        </Route>

      </Routes>

      <Footer />
    </>
  );
}

export default App;
