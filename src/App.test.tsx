import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";
import userEvent from "@testing-library/user-event";

vi.mock("./components/SearchHeader", () => {
  return {
    default: ({ searchItem, setSearchItem }: { searchItem: string; setSearchItem: (val: string) => void }) => (
      <div data-testid="search-header">
        <input
          data-testid="search-input"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>
    ),
  };
});

vi.mock("./components/SearchOutput", () => {
  return {
    default: ({ searchItem }: { searchItem: string }) => (
      <div data-testid="search-output">
        Current search: {searchItem || "none"}
      </div>
    ),
  };
});

vi.mock("./components/ui/ErrorButton", () => {
  return {
    default: () => {
      const [shouldThrow, setShouldThrow] = React.useState(false);
      if (shouldThrow) {
        throw new Error("Test Render Error");
      }
      return (
        <button data-testid="error-button" onClick={() => setShouldThrow(true)}>
          Trigger Error
        </button>
      );
    },
  };
});

describe("App Component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });


  test("inits state with an empty string if local storage is empty", () => {
    render(<App />);

    const input = screen.getByTestId("search-input") as HTMLInputElement;
    const output = screen.getByTestId("search-output");

    expect(input.value).toBe("");
    expect(output.textContent).toContain("Current search: none");
  });


  test("restores saved search query from localStorage on mount", () => {
    localStorage.setItem("lastSearch", "Evangelion");
    render(<App />);

    const input = screen.getByTestId("search-input") as HTMLInputElement;
    const output = screen.getByTestId("search-output");

    expect(input.value).toBe("Evangelion");
    expect(output.textContent).toContain("Current search: Evangelion");
  });


  test("updates localStorage and passes new value to SearchOutput on text input", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByTestId("search-input") as HTMLInputElement;

    await user.type(input, 'Evangelion');

    const output = screen.getByTestId("search-output");
    expect(output.textContent).toContain("Current search: Evangelion");

    expect(localStorage.getItem("lastSearch")).toBe("Evangelion");
    expect(setItemSpy).toHaveBeenCalledWith("lastSearch", "Evangelion");
  });


  test("does NOT overwrite localStorage if search query hasn't changed", () => {
    localStorage.setItem("lastSearch", "Evangelion");
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    const { rerender } = render(<App />);
    
    setItemSpy.mockClear();

    rerender(<App />);

    expect(setItemSpy).not.toHaveBeenCalled();
  });

});