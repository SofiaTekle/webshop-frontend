import type { CartItem } from "../types/product";
import type { CheckoutResponse } from "../types/checkout";
import type { OrderResponse } from "../types/order";

const API_BASE = import.meta.env.VITE_GATEWAY_API_URL;


export async function createOrder(items: CartItem[]): Promise<void> {

  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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


  const response = await fetch(`${API_BASE}/orders/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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

export async function getOrderById(orderId: number): Promise<OrderResponse>{

  const response = await fetch(`${API_BASE}/orders/${orderId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Kunde inte hämta ordern (${response.status}).`);
  }

  return response.json();
}
  


