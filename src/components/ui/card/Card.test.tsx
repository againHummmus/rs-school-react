import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';

const mockCard = {
  mal_id: 42,
  title_english: 'Cowboy Bebop',
  title_japanese: 'カウボーイビバップ',
  episodes: 26,
  images: { webp: { image_url: 'https://example.com/bebop.webp' } },
  synopsis: 'Space bounty hunters...',
  year: 1998,
};

function renderCard(props = mockCard) {
  return render(
    <MemoryRouter>
      <Card {...props} />
    </MemoryRouter>
  );
}

describe('Card Component', () => {
  test('renders card', () => {
    renderCard();
    expect(screen.getByText(mockCard.title_english)).toBeInTheDocument();
  });

  test('renders image with correct src and alt', () => {
    renderCard();
    const img = screen.getByRole('img', { name: mockCard.title_english });
    expect(img).toHaveAttribute('src', mockCard.images.webp.image_url);
  });

  test('shows title_japanese as subtitle when title_english is present', () => {
    renderCard();
    expect(screen.getByText(mockCard.title_japanese)).toBeInTheDocument();
  });

  test('falls back to title_japanese when title_english is falsy', () => {
    renderCard({ ...mockCard, title_english: null as unknown as string });
    expect(screen.getAllByText(mockCard.title_japanese).length).toBeGreaterThan(0);
  });

  test('renders episodes and year', () => {
    renderCard();
    expect(screen.getByText('26')).toBeInTheDocument();
    expect(screen.getByText('1998')).toBeInTheDocument();
  });

  test('hides episodes label when episodes is 0', () => {
    renderCard({ ...mockCard, episodes: 0 });
    expect(screen.queryByText('Episodes:')).not.toBeInTheDocument();
  });

  test('hides year label when year is 0', () => {
    renderCard({ ...mockCard, year: 0 });
    expect(screen.queryByText('Year:')).not.toBeInTheDocument();
  });

  test('renders synopsis', () => {
    renderCard();
    expect(screen.getByText(mockCard.synopsis)).toBeInTheDocument();
  });

  test('card link points to details route', () => {
    renderCard();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/details/42');
  });
});

