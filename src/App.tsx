import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/products" element={<ProductPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
