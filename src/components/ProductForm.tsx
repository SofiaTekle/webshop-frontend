import type { NewProduct } from "../types/product";
import { useState } from "react";

type ProductFormProps = {
  onSubmit: (product: NewProduct) => Promise<void>;
};

export default function ProductForm({ onSubmit }: ProductFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!name || !description || !price || !stock) {
      setError("Alla fält måste fyllas i.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        name,
        description,
        price: Number(price),
        stock: Number(stock),
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Något gick fel, försök igen.");
      }
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Namn</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="description">Beskrivning</label>
      <input
        id="description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="price">Pris</label>
      <input
        id="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label htmlFor="stock">Lagersaldo</label>
      <input
        id="stock"
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Skickar..." : "Lägg till produkt"}
      </button>
    </form>
  );
}
