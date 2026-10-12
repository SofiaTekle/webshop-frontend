import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { OrderResponse } from "../types/order";
import { getOrderById } from "../service/orderService";

export type PaidOrderProps = {
  clearCart: () => void;
};

export const PaymentSuccessPage = ({ clearCart }: PaidOrderProps) => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const numericOrderId = Number(orderId);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    async function loadOrder() {
      if (!Number.isInteger(numericOrderId) || numericOrderId <= 0) {
        setError("Ogiltigt order-ID.");
        setLoading(false);
        return;
      }

      try {
        const data = await getOrderById(numericOrderId);

        if (cancelled) return;

        setOrder(data);

        if (data.paymentStatus === "PENDING") {
          timeoutId = setTimeout(loadOrder, 2000);
        }
        if (data.paymentStatus === "PAID") {
          clearCart();
        }
      } catch (error) {
        if (cancelled) return;
        if (error instanceof Error) {
          if (error.message.includes("404")) {
            setError("Beställning kunde inte hittas.");
          } else {
            setError(error.message);
          }
        } else {
          setError("Något gick fel när beställningen hämtades.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    loadOrder();
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [numericOrderId, clearCart]);
  if (loading) {
    return <p>Laddar beställning...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return <p>Beställningen kunde inte hittas.</p>;
  }

  if (order.paymentStatus === "PENDING") {
    return (
      <main className="center-text">
        <h1>Inväntar betalningsbekräftelse...</h1>
      </main>
    );
  }
  if (order.paymentStatus === "PAID") {
    return (
      <main className="center-text">
        <h1>Tack för din beställning!</h1>
      </main>
    );
  }
  if (order.paymentStatus === "FAILED") {
    return (
      <main className="center-text">
        <h1>Betalning misslyckades</h1>
      </main>
    );
  }
};
