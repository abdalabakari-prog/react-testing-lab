import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";

const mockTransactions = [
  {
    id: 1,
    date: "2024-01-01",
    description: "Coffee",
    category: "Food",
    amount: 5,
  },
  {
    id: 2,
    date: "2024-01-02",
    description: "Rent",
    category: "Housing",
    amount: 500,
  },
];

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockTransactions),
    })
  );
});

describe("Search Transactions", () => {
  it("filters transactions based on search input", async () => {
    render(<AccountContainer />);

    await waitFor(() => {
      expect(screen.getByText("Coffee")).toBeInTheDocument();
      expect(screen.getByText("Rent")).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByPlaceholderText("Search your Recent Transactions"),
      {
        target: { value: "coffee" },
      }
    );

    await waitFor(() => {
      expect(screen.getByText("Coffee")).toBeInTheDocument();
      expect(screen.queryByText("Rent")).toBeNull();
    });
  });

  it("handles no matching search results", async () => {
    render(<AccountContainer />);

    fireEvent.change(
      screen.getByPlaceholderText("Search your Recent Transactions"),
      {
        target: { value: "xyz" },
      }
    );

    await waitFor(() => {
      expect(screen.queryByText("Coffee")).toBeNull();
      expect(screen.queryByText("Rent")).toBeNull();
    });
  });
});
