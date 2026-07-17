import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Shop from "./Shop";

describe("Shop Page", () => {
  it("renders the shop header with title", () => {
    render(<Shop />);
    expect(screen.getByText("Shop Our Collection")).toBeTruthy();
  });

  it("renders all three products including bundle", () => {
    render(<Shop />);
    expect(screen.getByText("Pink Serenity Bar Soap")).toBeTruthy();
    expect(screen.getByText("Turmeric & Honey Glow Bar Soap")).toBeTruthy();
    expect(screen.getByText("Turmeric & Pink Honey Glow Bar Bundle Pack")).toBeTruthy();
  });

  it("displays product descriptions", () => {
    render(<Shop />);
    expect(screen.getByText(/Softens skin, restores glow/)).toBeTruthy();
    expect(screen.getByText(/Brightens skin tone, fades dark spots/)).toBeTruthy();
    expect(screen.getByText(/Get both bestselling soaps/)).toBeTruthy();
  });

  it("displays product prices", () => {
    render(<Shop />);
    const prices10 = screen.getAllByText("$10.99");
    expect(prices10.length).toBe(2);
    const price21 = screen.getByText("$21");
    expect(price21).toBeTruthy();
  });

  it("renders Buy Now buttons with correct Stripe links", () => {
    render(<Shop />);
    const buyButtons = screen.getAllByText("Buy Now");
    expect(buyButtons.length).toBe(3);

    const links = screen.getAllByRole("link");
    const stripeLinks = links.filter(
      (link) =>
        link.getAttribute("href")?.includes("stripe.com") ||
        link.getAttribute("href")?.includes("buy.stripe.com")
    );
    expect(stripeLinks.length).toBeGreaterThanOrEqual(3);
  });

  it("opens Stripe links in new tab", () => {
    render(<Shop />);
    const stripeLinks = screen.getAllByRole("link").filter((link) =>
      link.getAttribute("href")?.includes("buy.stripe.com")
    );

    expect(stripeLinks.length).toBe(3);
    stripeLinks.forEach((link) => {
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    });
  });

  it("displays product benefits", () => {
    render(<Shop />);
    expect(screen.getByText("Softens & smooths skin")).toBeTruthy();
    expect(screen.getByText("Brightens uneven skin tone")).toBeTruthy();
    expect(screen.getByText("Includes both bestsellers")).toBeTruthy();
  });

  it("renders bottom CTA section with promo code", () => {
    render(<Shop />);
    expect(screen.getByText(/A Little Glow Goes A Long Way/)).toBeTruthy();
    expect(screen.getByText("SERENE")).toBeTruthy();
  });

  it("displays Best Value badge on bundle product", () => {
    render(<Shop />);
    expect(screen.getByText("Best Value")).toBeTruthy();
  });
});
