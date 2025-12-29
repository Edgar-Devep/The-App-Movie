import { useContext } from "react";
import { MoviesContext } from "./MoviesContext";

export const HomeMovie = () => {
  const { movies } = useContext(MoviesContext);

  return (
    <>
      <h2 className=" mb-2 font-bold">Populares</h2>
      <section className=" p-2 grid grid-cols-4 gap-3 border-2 border-indigo-600 rounded-2xl">
        {movies.map((movie) => (
          <article key={movie.id}>
            <img
              className=" rounded-2xl"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              title={movie.title}
            />
          </article>
        ))}
      </section>
    </>
  );
};
