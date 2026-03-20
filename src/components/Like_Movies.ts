import type { TypeMovieFetcher } from "../Types_Custom/TypesMovies";

export const likedMoviesList = () => {
  return JSON.parse(localStorage.getItem("liked-movie") || "{}");
};

export const likeMovie = (movie: TypeMovieFetcher ) => {
  const likeMovies = likedMoviesList();

  if (likeMovies[movie.id]) {
    likeMovies[movie.id] = undefined;
  } else {
    likeMovies[movie.id] = movie;
  }
  localStorage.setItem("liked-movie", JSON.stringify(likeMovies));
  window.dispatchEvent(new Event("storage"));
};