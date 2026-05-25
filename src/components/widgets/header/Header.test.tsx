import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

function renderHeader(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Header />
    </MemoryRouter>
  );
}

describe('Header Component', () => {
  test('renders Home link', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });

  test('renders About link', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  test('Home link points to /', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
  });

  test('About link points to /about', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
  });

  test('Home link is active when at /', () => {
    renderHeader('/');
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink.className).toContain('text-accent-light');
  });

  test('About link is active when at /about', () => {
    renderHeader('/about');
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink.className).toContain('text-accent-light');
  });

  test('Home link is not active when at /about', () => {
    renderHeader('/about');
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink.className).not.toContain('text-accent-light');
  });

  test('renders ErrorButton inside header', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /throw error/i })).toBeInTheDocument();
  });
});
