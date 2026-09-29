import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProductCard from "./ProductCard";
import type { Product } from "../types/product";

describe("ProductCard", () => {
  it("visar produktinformationen", () => {
    const product: Product = {
      id: 42,
      name: "Testprodukt",
      description: "Beskrivning av testprodukten",
      price: 199,
      stock: 5,
    };
    render(<ProductCard product={product} onAdd={vi.fn()} />);

    expect(
      screen.getByRole("heading", { name: "Testprodukt" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Beskrivning av testprodukten"),
    ).toBeInTheDocument();
    expect(screen.getByText("199 kr")).toBeInTheDocument();
    expect(screen.getByText("Lager: 5")).toBeInTheDocument();
  });

  it("anropar onAdd med rätt produkt vid klick", () => {
    const product: Product = {
      id: 42,
      name: "Testprodukt",
      description: "Beskrivning av testprodukten",
      price: 199,
      stock: 5,
    };
    const onAdd = vi.fn();

    render(<ProductCard product={product} onAdd={onAdd} />);

    fireEvent.click(screen.getByRole("button", { name: "Lägg i kundvagn" }));
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(product);
  });
});
