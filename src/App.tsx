import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/products" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
