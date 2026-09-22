import type { Product } from "../types/product";

const API_BASE = import.meta.env.VITE_PRODUCT_API_URL;



export async function getProducts(): Promise<Product[]> {

    // Tillfällig test-token tills frontend-login är implementerad
    const token = import.meta.env.VITE_TEST_TOKEN;


   const response = await fetch(`${API_BASE}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

    if(!response.ok){
        throw new Error(`Could not fetch products, ${response.status}`);
    }
    return response.json();


}