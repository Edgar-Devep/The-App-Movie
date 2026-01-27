import { createContext } from "react";

export const MoviesContext = createContext<TypeMoviesContext>({
  categoryId: [],
  trendingMovieHome: async () => [],
  unCominggMovie: async () => [],
  popular: async () => [],
  searchMovies: async () => [],
  posterPrincipalTop: async () => [],
  categoriesHome: async () => [],
  categoriesForId: async () => [],
});

export type TypeMoviesContext = {
  categoryId: TypeMovieFetcher[];
  trendingMovieHome: (page: number) => Promise<TypeMovieFetcher[]>;
  unCominggMovie: (page: number) => Promise<TypeMovieFetcher[]>;
  popular: (page: number) => Promise<TypeMovieFetcher[]>;
  searchMovies: (query: string) => Promise<TypeMovieFetcher[]>;
  posterPrincipalTop: () => Promise<TypeMovieFetcher[]>;
  categoriesHome: () => Promise<TypeMovieFetcher[]>;
  categoriesForId: (id: number, page: number) => Promise<TypeMovieFetcher[]>;
};

export type TypeMovieFetcher = {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  popularity: number;
};

export type DotsPaginaProps = {
  totalPages: number;
  currentPage: number;
};

export type ButtonAndMenuFavorite = {
  movieId: number;
  openId: number | null;
  setOpenId: (id: number | null) => void;
};

export type CategoryWithMovies = {
  id: number;
  name: string;
  movies: TypeMovieFetcher[];
}