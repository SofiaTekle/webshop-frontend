import { useNavigate } from "react-router-dom";
import type { NewProduct } from "../types/product";
import { createProduct } from "../service/productService";
import ProductForm from "../components/ProductForm";

export default function ProductFormPage() {
  const navigate = useNavigate();

  async function handleSubmit(product: NewProduct) {
    await createProduct(product);
    navigate("/admin/products");
  }
  return (
    <main>
      <h1>Lägg till produkt</h1>
      <ProductForm onSubmit={handleSubmit} />
    </main>
  );
}
