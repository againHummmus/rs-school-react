import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AnimeDetails from './AnimeDetails';
import { fetchAnimeById } from '../../lib/fetch';

vi.mock('../lib/fetch', () => ({
  default: vi.fn(),
  fetchAnimeById: vi.fn(),
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

describe('AnimeDetails Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fetchAnimeById).mockReturnValue(new Promise(() => {}));
  });

  test('renders nothing when no details param is set', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AnimeDetails />
      </MemoryRouter>
    );
    expect(screen.queryByText(/wait a second/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /close details/i })).not.toBeInTheDocument();
  });

  test('renders loading state when details param is set', () => {
    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <AnimeDetails />
      </MemoryRouter>
    );
    expect(screen.getByText(/wait a second/i)).toBeInTheDocument();
  });

  test('renders anime details on successful fetch', async () => {
    vi.mocked(fetchAnimeById).mockResolvedValue({ data: mockAnimeDetail });

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <AnimeDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/wait a second/i)).not.toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { name: /cowboy bebop/i })).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(fetchAnimeById).toHaveBeenCalledWith(1);
  });

  test('renders error message on failed fetch', async () => {
    vi.mocked(fetchAnimeById).mockRejectedValue(new Error('Not Found'));

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <AnimeDetails />
      </MemoryRouter>
    );

    const errorEl = await screen.findByText(/error: not found/i);
    expect(errorEl).toBeInTheDocument();
  });

  test('closes details panel when close button is clicked', async () => {
    vi.mocked(fetchAnimeById).mockResolvedValue({ data: mockAnimeDetail });
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <AnimeDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /cowboy bebop/i })).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /close details/i });
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /cowboy bebop/i })).not.toBeInTheDocument();
    });
  });
});
