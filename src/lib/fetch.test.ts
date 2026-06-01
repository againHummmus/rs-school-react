import { describe, it, expect, vi, beforeEach } from 'vitest';
import fetchAnime, { fetchAnimeById } from './fetch';

describe('Anime API Fetch Functions', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', mockFetch);
  });

  describe('fetchAnime', () => {
    it('returns data with default parameters', async () => {
      const mockData = { data: [{ title: 'Naruto' }] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await fetchAnime({});

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.jikan.moe/v4/anime?page=0&limit=10'
      );
      expect(result).toEqual(mockData);
    });

    it('correctly substitutes the search query parameter q', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] }),
      } as Response);

      await fetchAnime({ page: 2, limit: 20, q: 'One Piece' });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.jikan.moe/v4/anime?page=2&limit=20&q=One Piece'
      );
    });

    it('throws an error if the server responds with !ok status', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      await expect(fetchAnime({})).rejects.toThrow(
        'Failed to fetch anime: 404 Not Found'
      );
    });
  });

  describe('fetchAnimeById', () => {
    it('successfully fetches anime by ID', async () => {
      const mockAnime = { data: { mal_id: 1, title: 'Cowboy Bebop' } };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAnime,
      } as Response);

      const result = await fetchAnimeById(1);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.jikan.moe/v4/anime/1'
      );
      expect(result).toEqual(mockAnime);
    });
  });
});
