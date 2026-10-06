import type { Product } from "../types/product";
import placeholderImage from "../assets/placeholder.png";
import { useNavigate } from "react-router-dom";

type ProductCardProps = {
  product: Product;
  onAdd?: (product: Product) => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <img src={product.imageUrl || placeholderImage} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price} kr</p>
      <p>Lager: {product.stock}</p>

      {onAdd && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product);
          }}
        >
          Lägg i varukorg
        </button>
      )}
    </div>
  );
}
