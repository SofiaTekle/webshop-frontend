import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
    render(<ProductCard product={product} />);

    expect(
      screen.getByRole("heading", { name: "Testprodukt" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Beskrivning av testprodukten"),
    ).toBeInTheDocument();
    expect(screen.getByText("199 kr")).toBeInTheDocument();
    expect(screen.getByText("Lager: 5")).toBeInTheDocument();
  });
});
