import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  test('renders search button with children text', () => {

    const mockHandleClick = vi.fn();
    const mockButtonText = 'Search';

    render(<Button onClick={mockHandleClick}>{mockButtonText}</Button>);
    const buttonElement = screen.getByRole('button', { name: mockButtonText });
    expect(buttonElement).toBeInTheDocument();
  });
});
