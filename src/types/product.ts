export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  imageUrl: string;
};

export type Category = "SHOES" | "SWEATERS" | "PANTS" | "TOPS";

export type CartItem = Product & {
  quantity: number;
};

export type NewProduct = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  imageUrl: string;
};
