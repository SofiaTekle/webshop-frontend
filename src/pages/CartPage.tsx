import CartItemCard from "../components/CartItemCard";
import type { CartItem } from "../types/product";

type CartProps = {
  items: CartItem[];
};

const CartPage = ({ items }: CartProps) => {
 if (items.length === 0) {
  return (
    <main>
      <h1>Kundvagn</h1>
      <p>Kundvagnen är tom.</p>
    </main>
  );
}

  return (
    <main>
      <h1>Kundvagn</h1>

      {items.map((item) => (
        <CartItemCard key={item.id} item={item} />
      ))}
    </main>
  );
};
export default CartPage;
