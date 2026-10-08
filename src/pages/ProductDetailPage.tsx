import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../types/product";
import { getProductById } from "../service/productService";
import placeholderImage from "../assets/placeholder.png";

type ProductDetailProps ={
  onAdd: (product: Product) => void;
}

export default function ProductDetailPage({onAdd}: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      if (!id) {
        setError("Produkt saknas.");
        setLoading(false);
        return;
      }

      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("404")) {
            setError("Produkten kunde inte hittas.");
          } else {
            setError(error.message);
          }
        } else {
          setError("Något gick fel när produkten hämtades.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <p>Laddar produkt...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Produkten kunde inte hittas.</p>;
  }

  return (
    <main className="product-detail-page">
      <div className="product-detail">
        <h1>{product.name}</h1>

        <img
          className="product-detail-image"
          src={product.imageUrl || placeholderImage}
          alt={product.name}
        />

        <div className="product-detail-info">
          <p>{product.description}</p>
          <p>{product.price} kr</p>
          <p>Lager: {product.stock}</p>
          <p>Kategori: {product.category}</p>
          <button onClick={() => onAdd(product)}>Lägg i varukorg</button>
        </div>
      </div>
    </main>
  );
}
