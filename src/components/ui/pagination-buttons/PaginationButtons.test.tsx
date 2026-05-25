import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import PaginationButtons from './PaginationButtons';

function renderPagination(total: number, currentPage: number) {
  return render(
    <MemoryRouter>
      <PaginationButtons total={total} currentPage={currentPage} />
    </MemoryRouter>
  );
}

describe('PaginationButtons', () => {
  test('renders nothing when total is 10 or less', () => {
    const { container } = renderPagination(10, 1);
    expect(container.firstChild).toBeNull();
  });

  test('renders nothing when total is 0', () => {
    const { container } = renderPagination(0, 1);
    expect(container.firstChild).toBeNull();
  });

  test('renders prev and next buttons when total > 10', () => {
    renderPagination(20, 1);
    expect(screen.getByText('«')).toBeInTheDocument();
    expect(screen.getByText('»')).toBeInTheDocument();
  });

  test('prev button is disabled on first page', () => {
    renderPagination(50, 1);
    const prev = screen.getByText('«');
    expect(prev).toHaveClass('pointer-events-none');
  });

  test('prev button is enabled when not on first page', () => {
    renderPagination(50, 2);
    const prev = screen.getByText('«');
    expect(prev).not.toHaveClass('pointer-events-none');
  });

  test('next button is disabled on last page', () => {
    renderPagination(50, 5);
    const next = screen.getByText('»');
    expect(next).toHaveClass('pointer-events-none');
  });

  test('next button is enabled when not on last page', () => {
    renderPagination(50, 3);
    const next = screen.getByText('»');
    expect(next).not.toHaveClass('pointer-events-none');
  });

  test('current page link has active styling', () => {
    renderPagination(50, 3);
    const currentLink = screen.getByRole('link', { name: '3' });
    expect(currentLink).toHaveClass('bg-background');
  });

  test('non-current page links do not have active styling', () => {
    renderPagination(50, 3);
    const otherLink = screen.getByRole('link', { name: '2' });
    expect(otherLink).not.toHaveClass('bg-background');
  });

  test('page links have correct href', () => {
    renderPagination(30, 1);
    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute('href', '/?page=1');
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('href', '/?page=2');
    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute('href', '/?page=3');
  });

  test('prev link points to previous page', () => {
    renderPagination(50, 3);
    expect(screen.getByText('«')).toHaveAttribute('href', '/?page=2');
  });

  test('next link points to next page', () => {
    renderPagination(50, 3);
    expect(screen.getByText('»')).toHaveAttribute('href', '/?page=4');
  });

  test('renders ellipsis when pages are truncated', () => {
    renderPagination(200, 1);
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  test('renders all pages without ellipsis for small total', () => {
    renderPagination(30, 1);
    expect(screen.queryByText('...')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '3' })).toBeInTheDocument();
  });
});
