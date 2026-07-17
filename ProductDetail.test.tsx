import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import ProductDetail from "./ProductDetail";

afterEach(() => {
  cleanup();
});

// Mock wouter
vi.mock("wouter", () => ({
  useParams: () => ({ id: "1" }),
  useLocation: () => ["/product/1", () => {}],
}));

describe("ProductDetail", () => {
  it("renders product details correctly", () => {
    render(<ProductDetail />);
    // Price may appear multiple times (e.g., in header and add-to-cart button)
    expect(screen.getAllByText(/\$12\.99/i).length).toBeGreaterThan(0);
  });

  it("displays product benefits", () => {
    render(<ProductDetail />);
    expect(screen.getAllByText(/Key Benefits/i).length).toBeGreaterThan(0);
  });

  it("displays ingredients list", () => {
    render(<ProductDetail />);
    expect(screen.getAllByText(/Ingredients/i).length).toBeGreaterThan(0);
  });

  it("has quantity selector", () => {
    render(<ProductDetail />);
    expect(screen.getAllByText("1").length).toBeGreaterThan(0);
  });

  it("displays add to cart button", () => {
    render(<ProductDetail />);
    const addButton = screen.getAllByText(/Add to Cart/i);
    expect(addButton.length).toBeGreaterThan(0);
  });
});
