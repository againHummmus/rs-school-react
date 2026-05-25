import { Link, useSearchParams } from 'react-router-dom';
import useStore from '../../../store/store';
import type { Anime } from '../../types';

type CardProps = Pick<
  Anime,
  | 'mal_id'
  | 'title_english'
  | 'title_japanese'
  | 'episodes'
  | 'images'
  | 'synopsis'
  | 'year'
>;

export default function Card(anime: CardProps) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const addSelectedItem = useStore((state) => state.addSelectedItem);
  const removeSelectedItem = useStore((state) => state.removeSelectedItem);

  const onCheckboxChange = (item: Anime, checked: boolean) => {
    if (checked) {
      addSelectedItem(item);
    } else {
      removeSelectedItem(item);
    }
  };

  return (
    <Link
      to={{
        pathname: `details/${anime.mal_id}`,
        search: page ? `?page=${page}` : '',
      }}
      className="relative cursor-pointer text-background flex gap-4 rounded-2xl border border-foreground/30 hover:border-foreground/60 transition-all bg-foreground p-4 group"
    >
      <div
        className="absolute top-4 right-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          id={`checkbox-${anime.mal_id}`}
          checked={useStore((state) =>
            state.selectedItems.some((i) => i.mal_id === anime.mal_id)
          )}
          onChange={(e) => onCheckboxChange?.(anime as Anime, e.target.checked)}
          className="w-4 h-4 cursor-pointer accent-background rounded"
        />
      </div>

      <img
        src={anime.images.webp.image_url}
        alt={anime.title_english ?? anime.title_japanese}
        className="w-24 h-36 object-cover rounded-xl shrink-0"
      />
      <div className="flex flex-col gap-1 min-w-0 pr-6">
        <div>
          <p className="text-background font-semibold text-lg leading-tight">
            {anime.title_english ?? anime.title_japanese}
          </p>
          <p className="text-background/70 text-xs mt-0.5">
            {anime.title_english ? anime.title_japanese : ''}
          </p>
        </div>
        <div className="flex gap-4 text-sm text-background/80 mt-1">
          {anime.episodes && (
            <span>
              <span className="text-background">Episodes: </span>
              {anime.episodes}
            </span>
          )}
          {anime.year && (
            <span>
              <span className="text-background">Year: </span>
              {anime.year}
            </span>
          )}
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
