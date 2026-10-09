import type { CartItem } from "../types/product";
import { getToken } from "./authService";
import type { CheckoutResponse } from "../types/checkout";

const API_BASE = import.meta.env.VITE_ORDER_API_URL;


export async function createOrder(items: CartItem[]): Promise<void> {
  const token = getToken();

  if (!token) {
    throw new Error("Du måste logga in för att beställa.");
  }

  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error(`Beställningen misslyckades (${response.status}).`);
  }
}

export async function createCheckout(items: CartItem[]): Promise<CheckoutResponse> {
  const token = getToken();

  if (!token) {
    throw new Error("Du måste logga in för att beställa.");
  }

  const response = await fetch(`${API_BASE}/orders/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error(`Beställningen misslyckades (${response.status}).`);
  }

  return response.json();
}


