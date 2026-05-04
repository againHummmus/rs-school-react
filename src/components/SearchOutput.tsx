import React from 'react';
import fetchAnime from '../lib/fetch';
import Card from './ui/Card';

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

type OutputStateType = {
  anime: AnimeItem[];
  isLoading: boolean;
  error: Error | null;
};

export default class SearchOutput extends React.Component<
  OutputPropsType,
  OutputStateType
> {
  constructor(props: OutputPropsType) {
    super(props);

    this.state = {
      anime: [],
      isLoading: false,
      error: null,
    };
  }

  LIMIT = 10;

  async loadAnime() {
    this.setState({ isLoading: true, error: null });

    try {
      const response = await fetchAnime({
        limit: this.LIMIT,
        q: this.props.searchItem.trim(),
      });
      this.setState({ anime: response.data });
    } catch (error) {
      this.setState({ error: error as Error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.loadAnime();
  }

  componentDidUpdate(prevProps: OutputPropsType) {
    if (prevProps.searchItem !== this.props.searchItem) {
      this.loadAnime();
    }
  }

  componentWillUnmount(): void {
      this.setState({ isLoading: false, error: null });
  }

  render() {
    const { isLoading, anime, error } = this.state;

    if (error) {
      return <p className="text-text font-bold text-2xl">Something went wrong :( <br/> Error: "{error.message}"</p>;
    }

    if (isLoading) {
      return <p className="text-text font-bold text-2xl">Loading...</p>
    }

    if (anime.length === 0) {
      return <p className="text-text font-bold text-2xl">No results found :(</p>;
    }

    return (
      <>
        <h2 className="text-text font-bold text-2xl">Results:</h2>
        <div className="flex flex-col gap-4">
          {anime.map((animeItem) => (
            <Card key={animeItem.mal_id} {...animeItem} />
          ))}
        </div>
      </>
    );
  }
}
