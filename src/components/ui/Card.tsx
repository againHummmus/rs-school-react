import { useSearchParams } from 'react-router-dom';

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
  const [, setSearchParams] = useSearchParams();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchParams((prev) => {
      prev.set('details', String(mal_id));
      return prev;
    });
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex backdrop-blur-lg gap-4 rounded-2xl border border-foreground/30 hover:border-foreground/60 transition-all bg-foreground/10 p-4"
    >
      <img
          src={images.webp.image_url}
          alt={title_english}
        className="w-24 h-36 object-cover rounded-xl shrink-0"
      />
      <div className="flex flex-col gap-1 min-w-0">
        <div>
          <p className="text-text font-semibold text-lg leading-tight">
            {title_english ?? title_japanese}
          </p>
          <p className="text-foreground/70 text-xs mt-0.5">
            {title_english ? title_japanese : ''}
          </p>
        </div>
        <div className="flex gap-4 text-sm text-foreground/80 mt-1">
          {episodes && (
            <span>
              <span className="text-accent">Episodes: </span>
              {episodes}
            </span>
          )}
          {year && (
            <span>
              <span className="text-accent">Year: </span>
              {year}
            </span>
          )}
        </div>
        {synopsis && (
          <p className="text-foreground/70 text-sm mt-1 line-clamp-3">
            {synopsis}
          </p>
        )}
      </div>
    </div>
  );
}
