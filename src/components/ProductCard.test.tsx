import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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
      category: "SHOES",
      imageUrl: "https://example.com/shoes.jpg",
    };
    render(
      <MemoryRouter>
        <ProductCard product={product} onAdd={vi.fn()} />
      </MemoryRouter>,
    );

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
      category: "SHOES",
      imageUrl: "https://example.com/shoes.jpg",
    };
    const onAdd = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard product={product} onAdd={onAdd} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Lägg i varukorg" }));
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(product);
  });
});
