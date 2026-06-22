import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Anime } from '../../types';

type DetailsPanelProps = {
  detail: Anime | null;
  error: boolean;
  page: number;
  q: string;
};

const panelClass =
  'sticky top-20 aspect-square min-w-1/2 max-w-1/2 flex flex-col gap-4 rounded-2xl border border-foreground/30 bg-foreground p-4';

export default async function DetailsPanel({
  detail,
  error,
  page,
  q,
}: DetailsPanelProps) {
  const t = await getTranslations('Details');

  if (error) {
    return (
      <div className={panelClass}>
        <p className="text-text font-bold text-2xl">{t('error')}</p>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className={`${panelClass} items-center justify-center`}>
        <p className="text-background/60 text-center">{t('placeholder')}</p>
      </div>
    );
  }

  const closeQuery: Record<string, string> = {};
  if (page > 1) closeQuery.page = String(page);
  if (q) closeQuery.q = q;

  const title = detail.title_english ?? detail.title_japanese;
  const detailsConfig = [
    { label: t('score'), value: detail.score },
    { label: t('episodes'), value: detail.episodes },
    { label: t('year'), value: detail.year },
    { label: t('status'), value: detail.status },
    { label: t('duration'), value: detail.duration },
    { label: t('rating'), value: detail.rating },
  ].filter((item) => item.value);

  return (
    <div className={panelClass}>
      <Link
        className="cursor-pointer absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-accent-light text-background text-2xl font-bold transition-opacity hover:opacity-90"
        aria-label={t('close')}
        href={{ pathname: '/', query: closeQuery }}
        prefetch={false}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <path d="M6 6L18 18" />
          <path d="M18 6L6 18" />
        </svg>
      </Link>

      <Image
        src={detail.images.webp.large_image_url || detail.images.webp.image_url}
        alt={title}
        width={400}
        height={300}
        className="w-full rounded-xl object-cover h-1/2"
      />

      <div className="flex flex-col gap-4 h-1/2">
        <div className="pr-6">
          <h2 className="text-background font-bold text-xl leading-tight">
            {title}
          </h2>
          {detail.title_english && (
            <p className="text-background/60 text-xs mt-0.5">
              {detail.title_japanese}
            </p>
          )}
        </div>

        {detail.genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {detail.genres.map((g) => (
              <span
                key={g.mal_id}
                className="text-xs border border-background/40 rounded-full px-2 py-0.5 text-background/80"
              >
                {g.name}
              </span>
            ))}
          </div>
        )}

        <div className="text-sm text-background flex flex-col gap-1">
          {detailsConfig.map(({ label, value }) => (
            <p key={label}>
              <span className="font-medium">{label}: </span>
              {value}
            </p>
          ))}
        </div>

        {detail.synopsis && (
          <p className="text-background/70 text-sm leading-relaxed overflow-y-scroll no-scrollbar">
            {detail.synopsis}
          </p>
        )}
      </div>
    </div>
  );
}
