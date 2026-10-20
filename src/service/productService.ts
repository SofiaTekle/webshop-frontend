import type { Product, NewProduct } from "../types/product";

const API_BASE = import.meta.env.VITE_GATEWAY_API_URL;

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Could not fetch products, ${response.status}`);
  }

  return response.json();
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Could not fetch product, ${response.status}`);
  }

  return response.json();
}

export async function createProduct(product: NewProduct): Promise<Product> {
  const response = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error(`Could not create product, ${response.status}`);
  }

  return response.json();
}
