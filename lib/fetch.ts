import type { Anime } from '@/components/types';

const CACHE_TTL = Number(process.env.NEXT_PUBLIC_CACHE_TTL) || 300;

export type AnimeListResponse = {
  data: Anime[];
  pagination: { items: { total: number } };
};

export type AnimeDetailResponse = {
  data: Anime;
};

export async function fetchAnimeList({
  page = 1,
  limit = 10,
  q,
}: {
  page?: number;
  limit?: number;
  q?: string;
}): Promise<AnimeListResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (q) params.set('q', q);

  const res = await fetch(`https://api.jikan.moe/v4/anime?${params}`, {
    next: { revalidate: CACHE_TTL },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Failed to fetch anime: ${res.status} ${res.statusText}`);
  }
  return data;
}

export async function fetchAnimeById(id: number): Promise<AnimeDetailResponse> {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, {
    next: { revalidate: CACHE_TTL },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch anime: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
