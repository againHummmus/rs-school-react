import { useEffect, useRef } from 'react';
import { useAnimeList } from '../../../lib/fetch';
import Card from '../../ui/card/Card';
import { useSearchParams } from 'react-router-dom';
import PaginationButtons from '../../ui/pagination-buttons/PaginationButtons';

type AnimeItem = {
  mal_id: number;
  title_english: string;
  title_japanese: string;
  episodes: number;
  images: {
    webp: {
      image_url: string;
      large_image_url: string;
    };
  };
  synopsis: string;
  year: number;
};

type OutputPropsType = {
  searchItem: string;
};

export default function SearchOutput({ searchItem }: OutputPropsType) {
  const LIMIT = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page')!)
    : 1;
  const { data, isLoading, isError } = useAnimeList({
    page,
    limit: LIMIT,
    q: searchItem.trim(),
  });

  const prevSearchItem = useRef(searchItem);

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
  }, [searchItem, page]);

  return (
    <div className="flex flex-col gap-4 grow">
      {isError && (
        <p className="text-text font-bold text-2xl">Something went wrong :(</p>
      )}
      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="mt-24 h-12 w-12 rounded-full border-5 border-white border-t-transparent animate-spin"/>
        </div>
      )}
      {!isLoading && !isError && data.data.length === 0 && (
        <p className="text-text font-bold text-2xl">No results found :(</p>
      )}
      {!isLoading && !isError && data.data.length > 0 && (
        <>
          <div className="flex flex-col gap-4">
            {data.data.map((animeItem: AnimeItem) => (
              <Card key={animeItem.mal_id} {...animeItem} />
            ))}
          </div>
          <PaginationButtons total={data.pagination.items.total} currentPage={page} />
        </>
      )}
    </div>
  );
}
