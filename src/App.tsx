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
import ProductFormPage from "./pages/ProductFormPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";
import { PaymentCancelPage } from "./pages/PaymentCancelPage";
import { useEffect, useState } from "react";
import { getSession, login, logout } from "./service/authService";
import type { CurrentUser, LoginRequest } from "./types/auth.ts";

function App() {
  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const sessionUser = await getSession();
        setCurrentUser(sessionUser);
      } catch {
        setCurrentUser(null);
      } finally {
        setCheckingSession(false);
      }
    }
    restoreSession();
  }, []);

async function handleLogin(credentials: LoginRequest): Promise<void> {
    const loggedInUser = await login(credentials);
    setCurrentUser(loggedInUser);
  }

  async function handleLogout(): Promise<void> {
    try {
      await logout();
    } catch (error) {
      console.error("Utloggningen misslyckades:", error);
    } finally {
      setCurrentUser(null);
    }
  }

  if (checkingSession) {
    return <p>Kontrollerar inloggning...</p>;
  }


  return (
    <>
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        <Route element={<ProtectedRoute currentUser={currentUser} />}>
          <Route path="/" element={<WelcomePage currentUser={currentUser} />} />
          <Route path="/products" element={<ProductPage onAdd={addToCart} />} />
          <Route
            path="/products/:id"
            element={<ProductDetailPage onAdd={addToCart} />}
          />
          <Route
            path="/payment/success"
            element={<PaymentSuccessPage clearCart={clearCart} />}
          ></Route>
          <Route path="/payment/cancel" element={<PaymentCancelPage />}></Route>
          <Route
            path="/cart"
            element={
              <CartPage
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                items={cartItems}
              />
            }
          />
        </Route>

        <Route element={<AdminRoute currentUser={currentUser} />}>
          <Route path="/admin/products" element={<AdminProductPage />} />
          <Route path="/admin/products/new" element={<ProductFormPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
