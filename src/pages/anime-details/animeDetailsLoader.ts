import type { LoaderFunctionArgs } from 'react-router-dom';
import { fetchAnimeById } from '../../lib/fetch';

export async function animeDetailsLoader({ params }: LoaderFunctionArgs) {
  const id = params.id;

  if (!id) {
    throw new Response('Not Found', { status: 404 });
  }

  const res = await fetchAnimeById(Number(id));
  return res.data;
}
