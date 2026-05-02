import React from 'react';

type AnimeItem = {
  id: number;
  titleEn: string;
  titleJa: string;
  episodes: number;
  image: string;
  synopsis: string;
  year: number;
};

const mockAnimeList: AnimeItem[] = [
  {
    id: 2,
    titleEn: 'Attack on Titan',
    titleJa: '進撃の巨人',
    episodes: 87,
    image: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
    synopsis:
      'Humanity lives inside cities surrounded by enormous walls due to Titans — gigantic humanoid creatures who devour humans seemingly without reason.',
    year: 2013,
  },
  {
    id: 4,
    titleEn: 'Steins;Gate',
    titleJa: 'シュタインズ・ゲート',
    episodes: 24,
    image: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg',
    synopsis:
      'A self-proclaimed mad scientist accidentally discovers a method of sending messages to the past, triggering a chain of events that puts him and his friends in grave danger.',
    year: 2011,
  },
];

type OutputPropsType = {};

export default class SearchOutput extends React.Component<OutputPropsType> {
  constructor(props: OutputPropsType) {
    super(props);
  }

  render() {
    return (
      <div className="mt-6 flex flex-col gap-4 backdrop-blur-lg">
        <h2 className="text-text font-bold text-2xl">Results:</h2>
        <div className="flex flex-col gap-4">
          {mockAnimeList.map((anime) => (
            <div
              key={anime.id}
              className="flex gap-4 rounded-2xl border border-foreground/30 bg-foreground/10 p-4"
            >
              <img
                src={anime.image}
                alt={anime.titleEn}
                className="w-24 h-36 object-cover rounded-xl shrink-0"
              />
              <div className="flex flex-col gap-1 min-w-0">
                <div>
                  <p className="text-text font-semibold text-lg leading-tight">
                    {anime.titleEn}
                  </p>
                  <p className="text-foreground/70 text-xs mt-0.5">
                    {anime.titleJa}
                  </p>
                </div>
                <div className="flex gap-4 text-sm text-foreground/80 mt-1">
                  <span>
                    <span className="text-accent">Episodes:</span> {anime.episodes}
                  </span>
                  <span>
                    <span className="text-accent">Year:</span> {anime.year}
                  </span>
                </div>
                <p className="text-foreground/70 text-sm mt-1 line-clamp-3">
                  {anime.synopsis}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
