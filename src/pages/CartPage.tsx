import { useState } from "react";
import { createOrder } from "../service/orderService";
import CartItemCard from "../components/CartItemCard";
import type { CartItem } from "../types/product";

type CartProps = {
  items: CartItem[];
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onOrderSuccess: () => void;
};

const CartPage = ({
  items,
  onDecrease,
  onIncrease,
  onOrderSuccess,
}: CartProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleCheckout() {
    if (isSubmitting || items.length === 0) return;

    setIsSubmitting(true);
    setError("");

    try {
      await createOrder(items);
      onOrderSuccess();
      setSuccess("Beställningen har skapats!");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Det gick inte att skapa beställningen.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  const cartTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  if (items.length === 0) {
    return (
      <main className="center-text">
        <h1>Kundvagn</h1>
        <p>Kundvagnen är tom.</p>
        {success && <p role="status">{success}</p>}
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
      <div className="center-text">
        <button type="button" onClick={handleCheckout} disabled={isSubmitting}>
          {isSubmitting ? "Beställer..." : "Beställ"}
        </button>
        {error && <p role="alert">{error}</p>}
      </div>
    </main>
  );
};
export default CartPage;
