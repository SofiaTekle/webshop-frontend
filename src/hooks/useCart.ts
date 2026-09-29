import { useState } from "react";
import type { CartItem, Product } from "../types/product";

export function useCart (){
     
 const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    const index = cartItems.findIndex((item) => item.id === product.id);

    if (index === -1) {
      const newItem = { ...product, quantity: 1 };
      if (product.stock <= 0) {
        alert("Lagersaldot för denna produkt är för låg");
        return;
      }
      setCartItems([...cartItems, newItem]);
      alert(`${product.name} har lagts i kundvagnen`);
      return;
    }
    const currentItem = cartItems[index];

    if (currentItem.quantity >= currentItem.stock) {
      alert("Lagersaldot för denna produkt är för låg");
      return;
    }
    const updatedItems = [...cartItems];
    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1,
    };
    setCartItems(updatedItems);
    alert(`${product.name} har lagts i kundvagnen`);
  }

  return {cartItems,addToCart,};
}
