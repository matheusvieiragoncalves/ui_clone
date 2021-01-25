export interface Genero {
  name: string;
}

export interface Movie {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: string;
  number_of_seasons: number;
  first_air_date: string;
  genres: Genero[];
}

export interface ListMovie {
  results: Movie[];
}

export interface MovieCategories {
  slug: string;
  title: string;
  items: ListMovie;
}
