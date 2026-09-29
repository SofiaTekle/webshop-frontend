import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import CartPage from "./pages/CartPage";
import { useCart } from "./hooks/useCart";
import AdminRoute from "./components/AdminRoute";
import AdminProductPage from "./pages/AdminProductPage";

function App() {
  const {cartItems, addToCart,increaseQuantity, decreaseQuantity} = useCart();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/products" element={<ProductPage onAdd={addToCart} />} />
          <Route path="/cart" element={<CartPage onIncrease={increaseQuantity} onDecrease={decreaseQuantity} items={cartItems} />} />
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
