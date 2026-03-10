import { createContext } from "react";

export const MoviesContext = createContext<TypeMoviesContext>({
  categoryId: [],
  trailerKey: [],
  trendingMovie: async () => [],
  unCominggMovie: async () => [],
  popular: async () => [],
  searchMovies: async () => [],
  posterPrincipalTop: async () => ({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  }),
  categoriesHome: async () => [],
  categoriesForId: async () => [],
  trailerMovie: async () => [],
});

export type TypeMoviesContext = {
  categoryId: TypeMovieFetcher[];
  trailerKey: TrailerKeyVideo[];
  trendingMovie: (page: number) => Promise<TypeMovieFetcher[]>;
  unCominggMovie: (page: number) => Promise<TypeMovieFetcher[]>;
  popular: (page: number) => Promise<TypeMovieFetcher[]>;
  searchMovies: (query: string) => Promise<TypeMovieFetcher[]>;
  posterPrincipalTop: (page: number) => Promise<PosterPrincipalTopApiResponse>;
  categoriesHome: () => Promise<TypeMovieFetcher[]>;
  categoriesForId: (id: number, page: number) => Promise<TypeMovieFetcher[]>;
  trailerMovie: (id: number) => Promise<TrailerKeyVideo[]>;
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
  original_title: string;
  vote_average: number;
  vote_count: number;
};

export type PosterPrincipalTopApiResponse = {
  page: number;
  results: TypeMovieFetcher[];
  total_pages: number;
  total_results: number;
};

export type CategoryWithMovies = {
  id: number;
  name: string;
  movies: TypeMovieFetcher[];
};

export type TrailerKeyVideo = {
  id: string;
  key: string;
  site: string;
  type: string;
  name: string;
};

export type MovieModalProps = {
  movie: TypeMovieFetcher;
  isOpen: boolean;
  onClose: () => void;
  trailerKey?: TrailerKeyVideo[];
  onPlayTrailer?: () => void;
};

export type DotsPaginaProps = {
  totalPages: number;
  currentPage: number;
};

export type ButtonPrevAndNextProps = {
  prevPage: () => void;
  nextPage: () => void;
  disabledPrev?: boolean;
};

export type ButtonAndMenuFavorite = {
  movieId: number | string;
  openId: number | string | null;
  setOpenId: (id: number | string | null) => void;
};

export interface FavoriteInfoProps extends ButtonAndMenuFavorite {
  onInfoClick: () => void;
}