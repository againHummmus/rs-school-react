import { getTranslations } from 'next-intl/server';
import Card from '../../ui/card/Card';
import PaginationButtons from '../../ui/pagination-buttons/PaginationButtons';
import RefreshButton from './RefreshButton';
import type { Anime } from '../../types';

type SearchOutputProps = {
  items: Anime[];
  total: number;
  page: number;
  q: string;
};

export default async function SearchOutput({
  items,
  total,
  page,
  q,
}: SearchOutputProps) {
  const t = await getTranslations('Search');

  return (
    <div className="flex flex-col gap-4 grow">
      <div className="flex justify-center sticky top-20 z-10">
        <RefreshButton label={t('refresh')} />
      </div>

      {items.length === 0 ? (
        <p className="text-text font-bold text-2xl">{t('empty')}</p>
      ) : (
        <>
          <div key={page} className="flex flex-col gap-4">
            {items.map((item, index) => (
              <Card
                key={`${item.mal_id}-${index}`}
                anime={item}
                page={page}
                q={q}
              />
            ))}
          </div>
          <PaginationButtons total={total} currentPage={page} q={q} />
        </>
      )}
    </div>
  );
}
