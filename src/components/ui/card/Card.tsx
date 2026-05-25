import { Link, useSearchParams } from 'react-router-dom';

type CardProps = {
  mal_id: number;
  title_english: string;
  title_japanese: string;
  episodes: number;
  images: {
    webp: {
      image_url: string;
    };
  };
  synopsis: string;
  year: number;
};

export default function Card({ mal_id, title_english, title_japanese, episodes, images, synopsis, year }: CardProps) {
const [searchParams] = useSearchParams();
const page = searchParams.get('page');

  return (
    <Link to={{ pathname: `details/${mal_id}`, search: page ? `?page=${page}` : '' }}
      className="cursor-pointer text-background flex gap-4 rounded-2xl border border-foreground/30 hover:border-foreground/60 transition-all bg-foreground p-4"
    >
      <img
          src={images.webp.image_url}
          alt={title_english}
        className="w-24 h-36 object-cover rounded-xl shrink-0"
      />
      <div className="flex flex-col gap-1 min-w-0">
        <div>
          <p className="text-background font-semibold text-lg leading-tight">
            {title_english ?? title_japanese}
          </p>
          <p className="text-background/70 text-xs mt-0.5">
            {title_english ? title_japanese : ''}
          </p>
        </div>
        <div className="flex gap-4 text-sm text-background/80 mt-1">
          {episodes && (
            <span>
              <span className="text-background">Episodes: </span>
              {episodes}
            </span>
          )}
          {year && (
            <span>
              <span className="text-background">Year: </span>
              {year}
            </span>
          )}
        </div>
        {synopsis && (
          <p className="text-background/70 text-sm mt-1 line-clamp-3">
            {synopsis}
          </p>
        )}
      </div>
    </Link>
  );
}
