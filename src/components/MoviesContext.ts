import { createContext, type MouseEventHandler,} from "react";

export type TypeMovieFetcher = {
  id: number;
  title: string;
  poster_path: string;
};

export type TypeMoviesContext = {
  movies: TypeMovieFetcher[];
  upComingMovie: TypeMovieFetcher[];
  loading: boolean;
  page: number;
  nextPage: MouseEventHandler<HTMLButtonElement>;
  prevPage: MouseEventHandler<HTMLButtonElement>;
  searchMovies: (query: string) => Promise<TypeMovieFetcher[]>;
};

export const MoviesContext = createContext<TypeMoviesContext>({
  movies: [],
  upComingMovie: [],
  loading: true,
  page: 1,
  nextPage: () => {},
  prevPage: () => {},
  searchMovies: async () => [],
});
