import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import SearchHeader from './SearchHeader';
import userEvent from '@testing-library/user-event';

describe('Search Header Component', () => {
  test('renders search header', () => {
    const mockSearchItem = 'Evangelion';
    const mockSetSearchItem = vi.fn();

    render(
      <SearchHeader
        searchItem={mockSearchItem}
        setSearchItem={mockSetSearchItem}
      />
    );

    const inputElement = screen.getByDisplayValue(mockSearchItem);
    const buttonElement = screen.getByRole('button', { name: /search/i });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls setSearchItem after button is pressed', async () => {
    const mockSearchItem = 'Evangel';
    const mockSetSearchItem = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchHeader
        searchItem={mockSearchItem}
        setSearchItem={mockSetSearchItem}
      />
    );

    const buttonElement = screen.getByRole('button', { name: /search/i });
    await user.click(buttonElement);
    expect(mockSetSearchItem).toHaveBeenCalled();
  });

  test('rerenders when props change', () => {
    const { rerender } = render(
      <SearchHeader searchItem="Initial" setSearchItem={vi.fn()} />
    );
    
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.value).toBe('Initial');

    rerender(<SearchHeader searchItem="Updated" setSearchItem={vi.fn()} />);
    
    expect(input.value).toBe('Updated');
  });
});
