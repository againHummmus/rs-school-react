import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Anime } from '../../types';
import SelectCheckbox from '../select-checkbox/SelectCheckbox';

type CardProps = {
  anime: Anime;
  page: number;
  q: string;
};

export default async function Card({ anime, page, q }: CardProps) {
  const t = await getTranslations('Details');
  const title = anime.title_english ?? anime.title_japanese;

  const query: Record<string, string> = { details: String(anime.mal_id) };
  if (page > 1) query.page = String(page);
  if (q) query.q = q;

  return (
    <Link
      href={{ pathname: '/', query }}
      prefetch={false}
      className="relative cursor-pointer text-background flex gap-4 rounded-2xl border border-foreground/30 hover:border-foreground/60 transition-all bg-foreground p-4 group"
    >
      <SelectCheckbox anime={anime} />

      <Image
        src={anime.images.webp.image_url}
        alt={title}
        width={96}
        height={144}
        className="w-24 h-36 object-cover rounded-xl shrink-0"
      />
      <div className="flex flex-col gap-1 min-w-0 pr-6">
        <div>
          <p className="text-background font-semibold text-lg leading-tight">
            {title}
          </p>
          <p className="text-background/70 text-xs mt-0.5">
            {anime.title_english ? anime.title_japanese : ''}
          </p>
        </div>
        <div className="flex gap-4 text-sm text-background/80 mt-1">
          {anime.episodes ? (
            <span>
              <span className="text-background">{t('episodes')}: </span>
              {anime.episodes}
            </span>
          ) : null}
          {anime.year ? (
            <span>
              <span className="text-background">{t('year')}: </span>
              {anime.year}
            </span>
          ) : null}
        </div>
        {anime.synopsis && (
          <p className="text-background/70 text-sm mt-1 line-clamp-3">
            {anime.synopsis}
          </p>
        )}
      </div>
    </Link>
  );
}
