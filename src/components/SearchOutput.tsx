import { useEffect, useRef, useState } from 'react';
import fetchAnime from '../lib/fetch';
import Card from './ui/Card';
import { useSearchParams } from 'react-router-dom';
import PaginationButtons from './ui/PaginationButtons';

type AnimeItem = {
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

type OutputPropsType = {
  searchItem: string;
};

export default function SearchOutput({ searchItem }: OutputPropsType) {
  const [anime, setAnime] = useState<AnimeItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page')!)
    : 1;
  const LIMIT = 10;
  const prevSearchItem = useRef(searchItem);

  const loadAnime = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchAnime({
        page: page,
        limit: LIMIT,
        q: searchItem.trim(),
      });
      setAnime(response.data);
      setTotal(response.pagination.items.total);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (prevSearchItem.current !== searchItem) {
      prevSearchItem.current = searchItem;
      if (page !== 1) {
        setSearchParams((prev) => {
          prev.set('page', '1');
          return prev;
        });
        return;
      }
    }
    loadAnime();
  }, [searchItem, page]);

  return (
    <div className="flex flex-col gap-4 grow">
      {error && (
        <p className="text-text font-bold text-2xl">
          Something went wrong :( <br /> Error: "{error.message}"
        </p>
      )}
      {isLoading && <p className="text-text font-bold text-2xl">Loading...</p>}
      {!isLoading && !error && anime.length === 0 && (
        <p className="text-text font-bold text-2xl">No results found :(</p>
      )}
      {!isLoading && !error && anime.length > 0 && (
        <>
          <div className="flex flex-col gap-4">
            {anime.map((animeItem) => (
              <Card key={animeItem.mal_id} {...animeItem} />
            ))}
          </div>
          <PaginationButtons total={total} currentPage={page} />
        </>
      )}
    </div>
  );
}
