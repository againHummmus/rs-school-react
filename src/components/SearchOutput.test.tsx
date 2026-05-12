import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import SearchOutput from './SearchOutput';
import fetchAnime from '../lib/fetch';
import mockAnimeList from '../test-utils/mockAnimeList';

vi.mock('../lib/fetch', () => {
  return {
    default: vi.fn(),
  };
});

describe('SearchOutput Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading state', async () => {
    vi.mocked(fetchAnime).mockReturnValue(new Promise(() => {}));

    render(<SearchOutput searchItem="Eva" />);

    const loadingElement = screen.getByText(/loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders anime list on successful fetch', async () => {
    vi.mocked(fetchAnime).mockResolvedValue({ data: mockAnimeList });

    render(<SearchOutput searchItem="Neon" />);

    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    });

    expect(
      screen.getByRole('heading', { name: /results:/i })
    ).toBeInTheDocument();
    expect(fetchAnime).toHaveBeenCalledWith({ limit: 10, q: 'Neon' });
    expect(screen.getByText('Cowboy Bebop')).toBeInTheDocument();
    expect(screen.getByText('Evangelion')).toBeInTheDocument();
  });

  test('renders no results message when API returns empty list', async () => {
    vi.mocked(fetchAnime).mockResolvedValue({ data: [] });

    render(<SearchOutput searchItem="Unknown" />);

    const noResultsElement = await screen.findByText(/no results found/i);
    expect(noResultsElement).toBeInTheDocument();
  });

  test('renders error state on API failure', async () => {
    vi.mocked(fetchAnime).mockRejectedValue(new Error('Network Error'));

    const mockError = new Error('Network Error');
    const errorMessageText = `Something went wrong :( Error: "${mockError.message}"`;

    render(<SearchOutput searchItem="Eva" />);

    const errorMessage = await screen.findByText(errorMessageText, {
      exact: false,
    });
    expect(errorMessage).toBeInTheDocument();
  });

  test('triggers re-fetch when searchItem prop updates', async () => {
    vi.mocked(fetchAnime).mockResolvedValue({ data: [] });

    const { rerender } = render(<SearchOutput searchItem="Bebop" />);

    expect(fetchAnime).toHaveBeenCalledTimes(1);
    expect(fetchAnime).toHaveBeenLastCalledWith({ limit: 10, q: 'Bebop' });

    rerender(<SearchOutput searchItem="Tengen" />);

    await waitFor(() => {
      expect(fetchAnime).toHaveBeenCalledTimes(2);
    });
    expect(fetchAnime).toHaveBeenLastCalledWith({ limit: 10, q: 'Tengen' });
  });

test('does NOT trigger re-fetch when searchItem prop stays the same', async () => {
    vi.mocked(fetchAnime).mockResolvedValue({ data: [] });

    const { rerender } = render(<SearchOutput searchItem="Bebop" />);

    expect(fetchAnime).toHaveBeenCalledTimes(1);
    expect(fetchAnime).toHaveBeenLastCalledWith({ limit: 10, q: 'Bebop' });

    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    });

    vi.mocked(fetchAnime).mockClear();

    rerender(<SearchOutput searchItem="Bebop" />);

    expect(fetchAnime).not.toHaveBeenCalled();
  });
});
