import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ErrorButton from './ErrorButton';

describe('Error Button Component', () => {
  test('renders error button', () => {

    render(<ErrorButton />);

    const buttonElement = screen.getByRole('button', { name: /Throw error!/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
