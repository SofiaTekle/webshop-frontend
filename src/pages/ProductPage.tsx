import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";
import { categories } from "../types/category";

type ProductPageProps = {
  onAdd: (product: Product) => void;
};

export default function ProductPage({ onAdd }: ProductPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Alla");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const categoryOptions = ["Alla", ...categories];

  const filteredProducts =
    selectedCategory === "Alla"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong while fetching products");
        }
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return <p>Laddar produkter...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (products.length === 0) {
    return <p>Det finns inga produkter att visa.</p>;
  }

  return (
    <main>
      <h1 className="center-text">Produkter</h1>
      <span><strong>Kategori: </strong></span>
      <select
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
      >
        {categoryOptions.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="product-container">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
    </main>
  );
}
