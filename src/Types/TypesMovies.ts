import React, { createContext, type MouseEventHandler } from "react";

export const MoviesContext = createContext<TypeMoviesContext>({
  movies: [],
  upComingMovie: [],
  categoryId: [],
  searchMovies: async () => [],
  PosterPrincipalTop: async () => [],
  categoriesHome: async () => [],
  categoriesForId: async () => [],
  page: 1,
  setPage: () => {},
  pageUpComing: 1,
  setPageUpComing: () => {},
  nextPage: () => {},
  prevPage: () => {},
  prevPageUpComing: () => {},
  nextPageUpComing: () => {},
  loading: true,
});

export type TypeMoviesContext = {
  movies: TypeMovieFetcher[];
  upComingMovie: TypeMovieFetcher[];
  categoryId: TypeMovieFetcher[];
  searchMovies: (query: string) => Promise<TypeMovieFetcher[]>;
  PosterPrincipalTop: () => Promise<TypeMovieFetcher[]>;
  categoriesHome: () => Promise<TypeMovieFetcher[]>;
  categoriesForId: (id:number ) => Promise<TypeMovieFetcher[]>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageUpComing: number;
  setPageUpComing: React.Dispatch<React.SetStateAction<number>>;
  nextPage: MouseEventHandler<HTMLButtonElement>;
  prevPage: MouseEventHandler<HTMLButtonElement>;
  prevPageUpComing: MouseEventHandler<HTMLButtonElement>;
  nextPageUpComing: MouseEventHandler<HTMLButtonElement>;
  loading: boolean;
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
