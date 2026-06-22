import { setRequestLocale } from 'next-intl/server';
import { fetchAnimeList, fetchAnimeById } from '@/lib/fetch';
import type { Anime } from '@/components/types';
import SearchHeader from '@/components/widgets/search-header/SearchHeader';
import SearchOutput from '@/components/widgets/search-output/SearchOutput';
import DetailsPanel from '@/components/widgets/details-panel/DetailsPanel';

type SearchParams = {
  page?: string;
  q?: string;
  details?: string;
};

export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { page: pageParam, q = '', details } = await searchParams;
  const page = Number(pageParam) || 1;

  const list = await fetchAnimeList({ page, limit: 10, q: q.trim() });

  let detail: Anime | null = null;
  let detailError = false;
  if (details) {
    try {
      detail = (await fetchAnimeById(Number(details))).data;
    } catch {
      detailError = true;
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="w-full flex flex-col gap-3">
        <SearchHeader defaultValue={q} />
        <div className="flex gap-4 flex-row items-start">
          <SearchOutput
            items={list.data}
            total={list.pagination.items.total}
            page={page}
            q={q}
          />
          <DetailsPanel
            detail={detail}
            error={detailError}
            page={page}
            q={q}
          />
        </div>
      </div>
    </div>
  );
}
