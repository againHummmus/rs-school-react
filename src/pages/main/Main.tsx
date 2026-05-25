import { Outlet } from 'react-router-dom';
import SearchOutput from '../../components/widgets/search-output/SearchOutput';
import useLocalStorage from '../../hooks/useLocalStorage';
import SearchHeader from '../../components/widgets/search-header/SearchHeader';

function Main() {
  const [searchString, setSearchString] = useLocalStorage('lastSearch');

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="w-full flex flex-col gap-3">
        <SearchHeader
          searchItem={searchString}
          setSearchItem={(searchItem) => setSearchString(searchItem)}
        />
        <div className="flex gap-4 flex-row items-start">
            <SearchOutput searchItem={searchString} />
            <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
