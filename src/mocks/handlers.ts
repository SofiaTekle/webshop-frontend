import { http, HttpResponse } from "msw";
import type { Product } from "../types/product";

export const API_URL = import.meta.env.VITE_GATEWAY_API_URL;

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Testskor",
    description: "Bekväma skor för löpning",
    price: 499,
    stock: 10,
    category: "SHOES",
    imageUrl: null,
  },
  {
    id: 2,
    name: "Testtröja",
    description: "En varm och mjuk tröja",
    price: 299,
    stock: 5,
    category: "SWEATERS",
    imageUrl: null,
  },
];

export const handlers = [
  http.get(`${API_URL}/auth/me`, () => {
    return HttpResponse.json({
      subject: "ana.test@example.com",
      roles: ["ROLE_USER"],
    });
  }),

  http.get(`${API_URL}/products`, () => {
    return HttpResponse.json(mockProducts);
  }),
];
