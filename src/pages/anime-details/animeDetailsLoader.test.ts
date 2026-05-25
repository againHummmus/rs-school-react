import { describe, expect, test, vi, beforeEach } from 'vitest';
import { animeDetailsLoader } from './animeDetailsLoader';

vi.mock('../../lib/fetch', () => ({
  fetchAnimeById: vi.fn(),
}));

import { fetchAnimeById } from '../../lib/fetch';

const mockFetchAnimeById = vi.mocked(fetchAnimeById);

describe('animeDetailsLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('throws 404 Response when id param is missing', async () => {
    const loader = animeDetailsLoader({ params: {}, request: new Request('http://localhost/') });

    await expect(loader).rejects.toSatisfy((err: unknown) => {
      return err instanceof Response && err.status === 404;
    });

    expect(mockFetchAnimeById).not.toHaveBeenCalled();
  });

  test('calls fetchAnimeById with numeric id and returns data', async () => {
    const animeData = { mal_id: 1, title: 'Naruto' };
    mockFetchAnimeById.mockResolvedValueOnce({ data: animeData });

    const result = await animeDetailsLoader({
      params: { id: '1' },
      request: new Request('http://localhost/details/1'),
    });

    expect(mockFetchAnimeById).toHaveBeenCalledWith(1);
    expect(result).toEqual(animeData);
  });

  test('propagates error thrown by fetchAnimeById', async () => {
    mockFetchAnimeById.mockRejectedValueOnce(new Error('Network error'));

    const loader = animeDetailsLoader({
      params: { id: '42' },
      request: new Request('http://localhost/details/42'),
    });

    await expect(loader).rejects.toThrow('Network error');
  });
});
