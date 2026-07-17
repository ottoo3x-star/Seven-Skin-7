import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Home from "./Home";

afterEach(() => {
  cleanup();
});

vi.mock("wouter", () => ({
  useLocation: () => ["/", vi.fn()],
}));

vi.mock("@/_core/hooks/useAuth", () => ({
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    logout: vi.fn(),
  }),
}));

describe("Home Page - Luxury Redesign", () => {
  it("renders brand name", () => {
    render(<Home />);
    expect(screen.getAllByText(/Seven Sixth/i).length).toBeGreaterThan(0);
  });

  it("renders hero headline Clear Skin Soft Glow Real Results", () => {
    render(<Home />);
    expect(screen.getAllByText(/Clear Skin.*Soft Glow.*Real Results/i).length).toBeGreaterThan(0);
  });

  it("renders tagline Indulge Your Skin in Clarity and Glow", () => {
    render(<Home />);
    const taglines = screen.getAllByText(/Indulge Your Skin in Clarity/i);
    expect(taglines.length).toBeGreaterThanOrEqual(1);
  });

  it("renders exactly 3 products with View Product buttons", () => {
    render(<Home />);
    expect(screen.getAllByText(/Turmeric/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Pink Serenity/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bundle Pack/i).length).toBeGreaterThan(0);
    const viewButtons = screen.getAllByText(/View Product/i);
    expect(viewButtons.length).toBe(3);
  });

  it("renders Why Everyone Loves section", () => {
    render(<Home />);
    expect(screen.getAllByText(/Why Everyone Loves Seven Sixth Skin/i).length).toBeGreaterThan(0);
  });

  it("renders Real Glow Real Results testimonials", () => {
    render(<Home />);
    expect(screen.getAllByText(/Real Glow. Real Results./i).length).toBeGreaterThan(0);
  });

  it("renders Join The Glow List email section", () => {
    render(<Home />);
    expect(screen.getAllByText(/Join The Glow List/i).length).toBeGreaterThan(0);
  });

  it("shows SERENE promo code", () => {
    render(<Home />);
    expect(screen.getAllByText(/SERENE/i).length).toBeGreaterThan(0);
  });

  it("renders navigation Shop, About, Contact buttons", () => {
    render(<Home />);
    expect(screen.getAllByText(/Shop/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/About/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Contact/i).length).toBeGreaterThan(0);
  });

  it("opens SMS raffle popup when Contact is clicked", () => {
    render(<Home />);
    const contactBtn = screen.getAllByText(/Contact/i)[0];
    fireEvent.click(contactBtn);
    expect(screen.getAllByText(/Enter the Raffle/i).length).toBeGreaterThan(0);
  });

  it("opens product detail modal when View Product is clicked", () => {
    render(<Home />);
    const viewButtons = screen.getAllByText(/View Product/i);
    fireEvent.click(viewButtons[0]);
    expect(screen.getAllByText(/Ingredients/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Directions/i).length).toBeGreaterThan(0);
  });

  it("renders How We Make Our Soaps section", () => {
    render(<Home />);
    expect(screen.getAllByText(/How We Make Our Soaps/i).length).toBeGreaterThan(0);
  });

  it("renders footer with Instagram link", () => {
    render(<Home />);
    const igLinks = document.querySelectorAll('a[href*="sevensixthskin"]');
    expect(igLinks.length).toBeGreaterThan(0);
  });

  it("renders About SevvySerene section", () => {
    render(<Home />);
    expect(screen.getAllByText(/About SevvySerene/i).length).toBeGreaterThan(0);
  });
});
