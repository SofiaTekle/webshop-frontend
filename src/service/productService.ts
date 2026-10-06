import type { Product, NewProduct } from "../types/product";
import { getToken } from "./authService";

const API_BASE = import.meta.env.VITE_PRODUCT_API_URL;

export async function getProducts(): Promise<Product[]> {
  const token = getToken();

  const response = await fetch(`${API_BASE}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Could not fetch products, ${response.status}`);
  }

  return response.json();
}

export async function getProductById(id: number): Promise<Product> {
  const token = getToken();

  const response = await fetch(`${API_BASE}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Could not fetch product, ${response.status}`);
  }

  return response.json();
}

export async function createProduct(product: NewProduct): Promise<Product> {
  const token = getToken();

  const response = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error(`Could not create product, ${response.status}`);
  }

  return response.json();
}
