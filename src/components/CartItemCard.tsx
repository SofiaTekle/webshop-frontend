import type { CartItem } from "../types/product"


type CartItemProps = {
    item: CartItem
    onIncrease: (productId: number) => void;
    onDecrease: (productId: number) => void;
};

function CartItemCard({ item, onIncrease, onDecrease }: CartItemProps) {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>{item.price} kr</p>
      <p>Antal: {item.quantity}</p>
      <button onClick={() => onIncrease(item.id)}>+</button>
      <button onClick={() => onDecrease(item.id)}>-</button>
    </div>
  );
};
export default CartItemCard;