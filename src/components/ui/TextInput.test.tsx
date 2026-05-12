import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import TextInput from './TextInput';
import userEvent from '@testing-library/user-event';

describe('Text Input Component', () => {
  test('renders input', () => {
    const mockHandleChange = vi.fn();
    const mockValue = 'Search';
    const mockPlaceholder = 'Search for a character...';
    
    render(
      <TextInput
        value={mockValue}
        onChange={mockHandleChange}
        placeholder={mockPlaceholder}
      />
    );

    const inputElement = screen.getByDisplayValue(mockValue);

    expect(inputElement).toBeInTheDocument();
  });

  test('text input calls onChange handler on user input', async () => {
    const mockHandleChange = vi.fn();
    const mockValue = 'Search';
    const mockPlaceholder = 'Search for a character...';
    const user = userEvent.setup();

    render(
      <TextInput
        value={mockValue}
        onChange={mockHandleChange}
        placeholder={mockPlaceholder}
      />
    );

    const inputElement = screen.getByDisplayValue(
      mockValue
    ) as HTMLInputElement;
    const newValue = 'New Search';

    await user.type(inputElement, newValue);

    expect(mockHandleChange).toHaveBeenCalled();
  });

  test('renders placeholder text when value is empty', () => {
    const mockHandleChange = vi.fn();
    const mockValue = '';
    const mockPlaceholder = 'Search for a character...';
    render(
      <TextInput
        value={mockValue}
        onChange={mockHandleChange}
        placeholder={mockPlaceholder}
      />
    );
    const inputElement = screen.getByPlaceholderText(mockPlaceholder);
    expect(inputElement).toBeInTheDocument();
  });
});
