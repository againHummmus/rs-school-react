import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MiniCard from './MiniCard';

const mockAnime = {
  mal_id: 1,
  title_english: 'Cowboy Bebop',
  title_japanese: 'カウボーイビバップ',
  images: { webp: { image_url: 'https://example.com/bebop.webp', large_image_url: 'https://example.com/bebop_large.webp' } },
  year: 1998,
};

function renderMiniCard(props = mockAnime) {
  return render(
    <MemoryRouter>
      <MiniCard {...props} />
    </MemoryRouter>
  );
}

describe('MiniCard', () => {
  test('renders title_english when provided', () => {
    renderMiniCard();
    expect(screen.getByText('Cowboy Bebop')).toBeInTheDocument();
  });

  test('renders circular image with correct src and alt', () => {
    renderMiniCard();
    const img = screen.getByRole('img', { name: mockAnime.title_english });
    expect(img).toHaveAttribute('src', mockAnime.images.webp.image_url);
    expect(img).toHaveClass('rounded-full');
  });

  test('renders year when provided', () => {
    renderMiniCard();
    expect(screen.getByText('1998')).toBeInTheDocument();
  });

  test('does not render year when year is 0', () => {
    renderMiniCard({ ...mockAnime, year: 0 });
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  test('renders as a link to details page', () => {
    renderMiniCard();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/details/1');
  });
});
