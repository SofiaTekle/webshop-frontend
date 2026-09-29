import { useState, useEffect } from "react";
import type { CartItem, Product } from "../types/product";

const CART_STORAGE_KEY = "cartItems";

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = sessionStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    try {
      return JSON.parse(savedCart) as CartItem[];
    } catch {
      return [];
    }
  });

  function addToCart(product: Product) {
    const index = cartItems.findIndex((item) => item.id === product.id);

    if (index === -1) {
      const newItem = { ...product, quantity: 1 };
      if (product.stock <= 0) {
        alert("Lagersaldot för denna produkt är för lågt");
        return;
      }
      setCartItems([...cartItems, newItem]);
      alert(`${product.name} har lagts i kundvagnen`);
      return;
    }
    const currentItem = cartItems[index];

    if (currentItem.quantity >= currentItem.stock) {
      alert("Lagersaldot för denna produkt är för lågt");
      return;
    }
    const updatedItems = [...cartItems];
    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1,
    }
    setCartItems(updatedItems);
    alert(`${product.name} har lagts i kundvagnen`);
  };

  function increaseQuantity(productId: number) {
    const index = cartItems.findIndex((item) => item.id === productId);

    if (index === -1) {
      return;
    }
    const currentItem = cartItems[index];

    if (currentItem.quantity >= currentItem.stock) {
      alert("Lagersaldot för denna produkt är för lågt");
      return;
    }
    const updatedItem = [...cartItems];
    updatedItem[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1,
    };
    setCartItems(updatedItem);
  };

  function decreaseQuantity(productId: number) {
    const index = cartItems.findIndex((item) => item.id === productId);

    if (index === -1) {
      return;
    }
    const currentItem = cartItems[index];
    const updatedItem = [...cartItems];

    if (currentItem.quantity === 1) {
      updatedItem.splice(index, 1);
      setCartItems(updatedItem);
      return;
    }
    updatedItem[index] = {
      ...currentItem,
      quantity: currentItem.quantity - 1,
    };
    setCartItems(updatedItem);
  };

  useEffect(() => {
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);
  

  return { cartItems, addToCart, increaseQuantity, decreaseQuantity };
}
