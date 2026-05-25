import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';

function renderLayout(initialEntry = '/') {
  const router = createMemoryRouter(
    [
      {
        element: <Layout />,
        children: [
          { path: '/', element: <div>Main content</div> },
          { path: '/about', element: <div>About content</div> },
        ],
      },
    ],
    { initialEntries: [initialEntry] }
  );
  return render(<RouterProvider router={router} />);
}

describe('Layout Component', () => {
  test('renders header navigation links', () => {
    renderLayout();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  test('renders outlet content for / route', () => {
    renderLayout('/');
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  test('renders outlet content for /about route', () => {
    renderLayout('/about');
    expect(screen.getByText('About content')).toBeInTheDocument();
  });
});
