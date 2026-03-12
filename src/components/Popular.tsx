import { useContext } from "react";
import { MoviesContext } from "../Types_Custom/TypesMovies";
import { MovieList } from "../UI/MovieList";

export const Popular = () => {
  const { popular } = useContext(MoviesContext);

  return <MovieList title="Popular" path="/popular" fetchMovies={popular} />;
};