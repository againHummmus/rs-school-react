export default async function fetchAnime({ page=0, limit=10, q }: { page?: number; limit?: number; q?: string }) {
  const res = await fetch(`https://api.jikan.moe/v4/anime?page=${page}&limit=${limit}${q ? `&q=${q}` : ''}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch anime: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchAnimeById(id: number) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch anime: ${res.status} ${res.statusText}`);
  }
  return res.json();
}