import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";

beforeEach(() => {
  global.fetch = vi.fn((url, options) => {
    if (options?.method === "POST") {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            id: 2,
            date: "2024-01-02",
            description: "Book",
            category: "Education",
            amount: 20,
          }),
      });
    }

    return Promise.resolve({
      json: () => Promise.resolve([]),
    });
  });
});

describe("Add Transactions", () => {
  it("adds a new transaction to the DOM", async () => {
    render(<AccountContainer />);

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Book" },
    });

    fireEvent.change(screen.getByPlaceholderText("Category"), {
      target: { value: "Education" },
    });

    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: 20 },
    });

    fireEvent.click(screen.getByText("Add Transaction"));

    await waitFor(() => {
      expect(screen.getByText("Book")).toBeInTheDocument();
    });
  });

  it("calls POST request when submitting form", async () => {
    render(<AccountContainer />);

    fireEvent.click(screen.getByText("Add Transaction"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
});
