import type { Anime } from '@/components/types';

function escapeCSV(value: string | number | null | undefined): string {
  const str = String(value ?? '');
  return str.includes(',') || str.includes('"') || str.includes('\n')
    ? `"${str.replace(/"/g, '""')}"`
    : str;
}

export async function POST(request: Request) {
  const formData = await request.formData();

  let items: Anime[];
  try {
    items = JSON.parse(String(formData.get('items') ?? '[]')) as Anime[];
  } catch {
    return new Response('Invalid payload', { status: 400 });
  }

  const headers = [
    'ID',
    'Title',
    'Title (Japanese)',
    'Year',
    'Episodes',
    'Score',
    'Status',
    'Rating',
    'Duration',
    'Genres',
    'Description',
    'Details URL',
  ];

  const origin = new URL(request.url).origin;
  const rows = items.map((item) =>
    [
      item.mal_id,
      escapeCSV(item.title_english ?? item.title_japanese),
      escapeCSV(item.title_japanese),
      item.year || '',
      item.episodes || '',
      item.score || '',
      escapeCSV(item.status),
      escapeCSV(item.rating),
      escapeCSV(item.duration),
      escapeCSV(item.genres.map((g) => g.name).join('; ')),
      escapeCSV(item.synopsis),
      `${origin}/?details=${item.mal_id}`,
    ].join(',')
  );

  const csv = '﻿' + [headers.join(','), ...rows].join('\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv;charset=utf-8',
      'Content-Disposition': `attachment; filename="${items.length}_items.csv"`,
    },
  });
}
