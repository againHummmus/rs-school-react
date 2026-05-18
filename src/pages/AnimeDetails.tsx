import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAnimeById } from '../lib/fetch';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClose = () => {
    setSearchParams((prev) => {
      prev.delete('details');
      return prev;
    });
  };
  const id = searchParams.get('details');
  const [anime, setAnime] = useState<AnimeDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setError(null);
      setAnime(null);
    }
    setIsLoading(true);
    setError(null);
    setAnime(null);
    fetchAnimeById(Number(id))
      .then((res: { data: AnimeDetailType }) => setAnime(res.data))
      .catch((err: Error) => setError(err))
      .finally(() => setIsLoading(false));
  }, [id]);


  if (!id) return;

  if (isLoading) {
    return (
      <div className="rounded-2xl aspect-square border border-foreground/30 bg-foreground/10 backdrop-blur-lg flex items-center justify-center">
        <p className="text-text font-bold text-xl text-center">
          Wait a second!
        </p>
      </div>
    );
  }

  return (
    <div
      className="aspect-square flex flex-col gap-4 rounded-2xl border border-foreground/30 bg-foreground/10 backdrop-blur-lg p-4 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleClose}
        className="cursor-pointer absolute top-3 right-3 text-text hover:opacity-70 transition-opacity text-2xl font-bold leading-none z-10"
        aria-label="Close details"
      >
        ×
      </button>
      {error && (
        <p className="text-text font-bold text-xl">Error: {error.message}</p>
      )}

      {anime && (
        <>
          <img
            src={
              anime.images.webp.large_image_url || anime.images.webp.image_url
            }
            alt={anime.title_english ?? anime.title_japanese}
            className="w-full rounded-xl object-cover h-1/2"
          />
          <div className="flex flex-col gap-4 h-1/2">
              <div className="pr-6">
                <h2 className="text-text font-bold text-xl leading-tight">
                  {anime.title_english ?? anime.title_japanese}
                </h2>
                {anime.title_english && (
                  <p className="text-foreground/60 text-xs mt-0.5">
                    {anime.title_japanese}
                  </p>
                )}
              </div>
    
              {anime.genres.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {anime.genres.map((g) => (
                    <span
                      key={g.mal_id}
                      className="text-xs border border-foreground/40 rounded-full px-2 py-0.5 text-foreground/80"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              )}
    
              <div className="text-sm text-foreground/80 flex flex-col gap-1">
                {anime.score && (
                  <p>
                    <span className="text-accent font-medium">Score: </span>
                    {anime.score}
                  </p>
                )}
                {anime.episodes && (
                  <p>
                    <span className="text-accent font-medium">Episodes: </span>
                    {anime.episodes}
                  </p>
                )}
                {anime.year && (
                  <p>
                    <span className="text-accent font-medium">Year: </span>
                    {anime.year}
                  </p>
                )}
                {anime.status && (
                  <p>
                    <span className="text-accent font-medium">Status: </span>
                    {anime.status}
                  </p>
                )}
                {anime.duration && (
                  <p>
                    <span className="text-accent font-medium">Duration: </span>
                    {anime.duration}
                  </p>
                )}
                {anime.rating && (
                  <p>
                    <span className="text-accent font-medium">Rating: </span>
                    {anime.rating}
                  </p>
                )}
              </div>
    
              {anime.synopsis && (
                <p className="text-foreground/70 text-sm leading-relaxed overflow-y-scroll no-scrollbar">
                  {anime.synopsis}
                </p>
              )}
          </div>
        </>
      )}
    </div>
  );
}
