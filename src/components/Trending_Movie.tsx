import { useContext } from "react";
import { MoviesContext } from "../Types_Custom/TypesMovies";
import { MovieList } from "../UI/MovieList";

export const TrendingMovie = () => {
  const { trendingMovie } = useContext(MoviesContext);

  return <MovieList title="Trending" path="/trending" fetchMovies={trendingMovie} />;
};