import { Link, useSearchParams, useLoaderData } from 'react-router-dom';

type AnimeDetailType = {
  mal_id: number;
  title_english: string | null;
  title_japanese: string;
  synopsis: string;
  episodes: number;
  year: number;
  score: number;
  status: string;
  duration: string;
  rating: string;
  images: { webp: { image_url: string; large_image_url: string } };
  genres: { mal_id: number; name: string }[];
};

export default function AnimeDetails() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const anime = useLoaderData() as AnimeDetailType;

  const detailsConfig = [
    { label: 'Score', value: anime.score },
    { label: 'Episodes', value: anime.episodes },
    { label: 'Year', value: anime.year },
    { label: 'Status', value: anime.status },
    { label: 'Duration', value: anime.duration },
    { label: 'Rating', value: anime.rating },
  ].filter(item => item.value);

  return (
    <div
      className="sticky top-[80px] aspect-square min-w-1/2 max-w-1/2 flex flex-col gap-4 rounded-2xl border border-foreground/30 bg-foreground p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <Link
        className="cursor-pointer absolute top-3 right-3 text-background hover:opacity-70 transition-opacity text-2xl font-bold leading-none z-10"
        aria-label="Close details" 
        to={`/${page ? `?page=${page}` : ''}`}
      >
        ×
      </Link>

      <img
        src={anime.images.webp.large_image_url || anime.images.webp.image_url}
        alt={anime.title_english ?? anime.title_japanese}
        className="w-full rounded-xl object-cover h-1/2"
      />
      
      <div className="flex flex-col gap-4 h-1/2">
        <div className="pr-6">
          <h2 className="text-background font-bold text-xl leading-tight">
            {anime.title_english ?? anime.title_japanese}
          </h2>
          {anime.title_english && (
            <p className="text-background/60 text-xs mt-0.5">{anime.title_japanese}</p>
          )}
        </div>

        {anime.genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {anime.genres.map((g) => (
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

        {anime.synopsis && (
          <p className="text-background/70 text-sm leading-relaxed overflow-y-scroll no-scrollbar">
            {anime.synopsis}
          </p>
        )}
      </div>
    </div>
  );
}