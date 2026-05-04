export default async function fetchAnime({ start=0, limit=10, q }: { start?: number; limit?: number; q?: string }) {
  const res = await fetch(`https://api.jikan.moe/v4/anime?start=${start}&limit=${limit}${q ? `&q=${q}` : ''}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch anime: ${res.status} ${res.statusText}`);
  }
  return res.json();
}