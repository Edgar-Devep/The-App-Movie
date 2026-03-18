import type { TypeMovieFetcher } from "../Types_Custom/TypesMovies";

export const likedMoviesList = () => {
  const item = JSON.parse(localStorage.getItem("liked-movie") || "{}");
  let movies;

  if (item) {
    movies = item;
  } else {
    movies = {};
  }

  return movies;
};

export const likeMovie = (movie: TypeMovieFetcher ) => {
  const likeMovies = likedMoviesList();
  console.log(likeMovies);

  if (likeMovies[movie.id]) {
    console.log("La Pelicula ya Existe en localStorage deberias eliminarla");
    likeMovies[movie.id] = undefined;
  } else {
    console.log(movie.id);
    likeMovies[movie.id] = movie;
  }
  localStorage.setItem("liked-movie", JSON.stringify(likeMovies));
  // 👇 Dispara el evento para que el componente se entere en la misma pestaña
  window.dispatchEvent(new Event("storage"));
};
