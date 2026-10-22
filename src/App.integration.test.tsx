import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import App from "./App";
import { server } from "./mocks/server";
import { API_URL } from "./mocks/handlers";

function renderProducts() {
  return render(
    <MemoryRouter initialEntries={["/products"]}>
      <App />
    </MemoryRouter>,
  );
}

describe("Produkthämtning – integration", () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it("visar produkter för en inloggad användare", async () => {
    renderProducts();

    expect(await screen.findByText("Testskor")).toBeInTheDocument();
    expect(await screen.findByText("Testtröja")).toBeInTheDocument();

    expect(
      screen.queryByText(/Could not fetch products/),
    ).not.toBeInTheDocument();
  });

  it("visar ett felmeddelande när produkthämtningen misslyckas", async () => {
    server.use(
      http.get(`${API_URL}/products`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderProducts();

    expect(
      await screen.findByText("Could not fetch products, 500"),
    ).toBeInTheDocument();

    expect(screen.queryByText("Testskor")).not.toBeInTheDocument();
  });
});
