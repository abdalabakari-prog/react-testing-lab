import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";

const mockTransactions = [
  {
    id: 1,
    date: "2024-01-01",
    description: "Coffee",
    category: "Food",
    amount: 5,
  },
];

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockTransactions),
    })
  );
});

describe("Display Transactions", () => {
  it("renders transactions on load", async () => {
    render(<AccountContainer />);

    await waitFor(() => {
      expect(screen.getByText("Coffee")).toBeInTheDocument();
    });
  });

  it("renders table headers", async () => {
    render(<AccountContainer />);

    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
  });
});
