import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchHeader from '../components/SearchHeader';
import SearchOutput from '../components/SearchOutput';
import ErrorButton from '../components/ui/ErrorButton';
import AnimeDetails from './AnimeDetails';

function Main() {
  const [searchString, setSearchString] = useState(
    localStorage.getItem('lastSearch') || ''
  );
  const [searchParams] = useSearchParams();
  const detailsId = searchParams.get('details');

  useEffect(() => {
    localStorage.setItem('lastSearch', searchString);
  }, [searchString]);

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="w-full flex flex-col gap-3">
        <SearchHeader
          searchItem={searchString}
          setSearchItem={(searchItem) => setSearchString(searchItem)}
        />
        <div className="flex gap-4 flex-row items-start">
            <SearchOutput searchItem={searchString} />
          {detailsId && <div className="sticky self-start w-1/2 shrink-0 top-22">
            <AnimeDetails />
          </div>}
        </div>
      </div>
    </div>
  );
}

export default Main;
