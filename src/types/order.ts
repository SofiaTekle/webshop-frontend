export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export type OrderResponse = {
    id:number;
    paymentStatus: PaymentStatus;
}