import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About Page', () => {
  test('renders the main heading', () => {
    render(<About />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  test('renders the Jikan API link', () => {
    render(<About />);
    const link = screen.getByRole('link', { name: /jikan api/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://jikan.moe');
  });

  test('renders the RS School React Course link', () => {
    render(<About />);
    const link = screen.getByRole('link', { name: /rs school react course/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });

  test('renders the tech stack list', () => {
    render(<About />);
    expect(screen.getByText(/react 19/i)).toBeInTheDocument();
    expect(screen.getByText(/typescript/i)).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
    expect(screen.getByText(/tailwind css/i)).toBeInTheDocument();
    expect(screen.getByText(/react router/i)).toBeInTheDocument();
  });
});