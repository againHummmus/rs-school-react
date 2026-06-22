export type Anime = {
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
  images: {
    webp: {
      image_url: string;
      large_image_url: string;
    };
  };
  genres: { mal_id: number; name: string }[];
};
