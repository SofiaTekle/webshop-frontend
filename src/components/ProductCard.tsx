import type { Product } from "../types/product";
import placeholderImage from "../assets/placeholder.png";

type ProductCardProps = {
  product: Product;
  onAdd?: (product: Product) => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl || placeholderImage}
        alt={product.name}
      />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price} kr</p>
      <p>Lager: {product.stock}</p>

      {onAdd && <button onClick={() => onAdd(product)}>Lägg i varukorg</button>}
    </div>
  );
}
