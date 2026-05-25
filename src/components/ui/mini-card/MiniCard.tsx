import { Link, useSearchParams } from 'react-router-dom';
import type { Anime } from '../../types';

type MiniCardProps = Pick<
  Anime,
  'mal_id' | 'title_english' | 'title_japanese' | 'images' | 'year'
>;

export default function MiniCard({ mal_id, title_english, title_japanese, images, year }: MiniCardProps) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const title = title_english ?? title_japanese;

  return (
    <Link
      to={{
        pathname: `details/${mal_id}`,
        search: page ? `?page=${page}` : '',
      }}
      className="flex items-center gap-3 rounded-2xl border border-accent-light/30 hover:border-accent-light/60 bg-accent-light/10 hover:bg-accent-light/20 transition-all px-3 py-2 cursor-pointer"
    >
      <img
        src={images.webp.image_url}
        alt={title}
        className="w-12 h-12 rounded-full object-cover shrink-0"
      />
      <div className="flex flex-col min-w-0">
        <p className="text-background font-medium text-sm leading-tight truncate">{title}</p>
        {year ? <p className="text-background/60 text-xs mt-0.5">{year}</p> : null}
      </div>
    </Link>
  );
}
