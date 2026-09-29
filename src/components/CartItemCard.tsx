import type { CartItem } from "../types/product"


type CartItemProps = {
    item: CartItem
};

function CartItemCard({ item }: CartItemProps) {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>{item.price} kr</p>
      <p>Antal: {item.quantity}</p>
    </div>
  );
};
export default CartItemCard;