import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useAnimeDetails } from '../../lib/fetch';
import AnimeDetails from './AnimeDetails';

vi.mock('../../lib/fetch', () => ({
  useAnimeDetails: vi.fn(),
}));

const mockAnimeDetail = {
  mal_id: 1,
  title_english: 'Cowboy Bebop',
  title_japanese: 'カウボーイビバップ',
  synopsis: 'Space bounty hunters...',
  episodes: 26,
  year: 1998,
  score: 8.75,
  status: 'Finished Airing',
  duration: '24 min per ep',
  rating: 'R - 17+',
  images: {
    webp: {
      image_url: 'https://example.com/bebop.webp',
      large_image_url: 'https://example.com/bebop-large.webp',
    },
  },
  genres: [
    { mal_id: 1, name: 'Action' },
    { mal_id: 2, name: 'Drama' },
  ],
};

function renderDetails(initialEntry = '/details/1') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AnimeDetails />
    </MemoryRouter>
  );
}

describe('AnimeDetails Component', () => {
  beforeEach(() => {
    vi.mocked(useAnimeDetails).mockReturnValue({
      data: { data: mockAnimeDetail },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useAnimeDetails>);
  });

  test('renders loading spinner', () => {
    vi.mocked(useAnimeDetails).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as ReturnType<typeof useAnimeDetails>);

    const { container } = renderDetails();
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  test('renders error state', () => {
    vi.mocked(useAnimeDetails).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as ReturnType<typeof useAnimeDetails>);

    renderDetails();
    expect(screen.getByText('Something went wrong :(')).toBeInTheDocument();
  });

  test('renders anime title', () => {
    renderDetails();
    expect(screen.getByRole('heading', { name: /cowboy bebop/i })).toBeInTheDocument();
  });

  test('renders anime image with correct src', () => {
    renderDetails();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockAnimeDetail.images.webp.large_image_url);
  });

  test('renders genres', () => {
    renderDetails();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
  });

  test('renders score, episodes, year and status', () => {
    renderDetails();
    expect(screen.getByText('8.75')).toBeInTheDocument();
    expect(screen.getByText('26')).toBeInTheDocument();
    expect(screen.getByText('1998')).toBeInTheDocument();
    expect(screen.getByText('Finished Airing')).toBeInTheDocument();
  });

  test('close link points to home', () => {
    renderDetails();
    const closeLink = screen.getByRole('link', { name: /close details/i });
    expect(closeLink).toHaveAttribute('href', '/');
  });

  test('close link preserves page param', () => {
    renderDetails('/details/1?page=3');
    const closeLink = screen.getByRole('link', { name: /close details/i });
    expect(closeLink).toHaveAttribute('href', '/?page=3');
  });
});

