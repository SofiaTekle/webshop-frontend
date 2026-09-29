import CartItemCard from "../components/CartItemCard";
import type { CartItem } from "../types/product"

type CartProps = {
    items: CartItem[];
}

const CartPage = ({items }: CartProps) => {
    return (
        <main>
          <h1>Kundvagn</h1>
    
          {items.map((item) => (
            <CartItemCard key={item.id} item={item}/>
          ))}
        </main>
      );
};
export default CartPage;