export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export type OrderItemResponse = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type OrderResponse = {
  id: number;
  paymentStatus: PaymentStatus;
  orderItems: OrderItemResponse[];
  totalPrice: number;
};
