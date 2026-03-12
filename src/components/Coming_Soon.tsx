import { useContext } from "react";
import { MoviesContext } from "../Types_Custom/TypesMovies";
import { MovieList } from "../UI/MovieList";

export const ComingSoon = () => {
  const { unCominggMovie } = useContext(MoviesContext);

  return <MovieList title="Coming Soon" path="/coming-soon" fetchMovies={unCominggMovie} />;
};