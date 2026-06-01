import { useQuery } from '@tanstack/react-query';

export default async function fetchAnime({ page=0, limit=10, q }: { page?: number; limit?: number; q?: string }) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime?page=${page}&limit=${limit}${q ? `&q=${q}` : ''}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch anime: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    throw new Error(`Failed to fetch anime: ${error}`);
  }
}

export async function fetchAnimeById(id: number) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch anime: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    throw new Error(`Failed to fetch anime by ID: ${error}`);
  }
}

export const useAnimeList = ({ page = 1, limit, q }: { page: number; limit?: number; q?: string }) => {

  return useQuery({
    queryKey: ['anime', 'list', page, limit, q], 
    queryFn: () => fetchAnime({ page, limit, q }),
  });
};

export const useAnimeDetails = ({ id }: { id: number }) => {

  return useQuery({
    queryKey: ['anime', 'details', id],
    queryFn: () => fetchAnimeById(id),
    enabled: id !== null, 
  });
};