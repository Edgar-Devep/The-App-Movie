import { createContext } from "react";

export type TypeMovieFetcher = {
  id: number;
  title: string;
  poster_path: string;
};

export type TypeMoviesContext = {
  movies: TypeMovieFetcher[];
  upComingMovie: TypeMovieFetcher[];
  loading: boolean;
};

export const MoviesContext = createContext<TypeMoviesContext>({
  movies: [],
  upComingMovie: [],
  loading: true,
});
