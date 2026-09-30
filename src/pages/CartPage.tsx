import CartItemCard from "../components/CartItemCard";
import type { CartItem } from "../types/product";

type CartProps = {
  items: CartItem[];
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
};

const CartPage = ({ items, onDecrease, onIncrease }: CartProps) => {
  const cartTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  if (items.length === 0) {
    return (
      <main className="center-text">
        <h1>Kundvagn</h1>
        <p>Kundvagnen är tom.</p>
      </main>
    );
  }

  return (
    <main>
      <h1 className="center-text">Kundvagn</h1>

      <div className="cart-container">
        {items.map((item) => (
          <CartItemCard
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            key={item.id}
            item={item}
          />
        ))}
      </div>
      <p className="center-text">
        <strong>Total: {cartTotal} kr</strong>
      </p>
    </main>
  );
};
export default CartPage;
