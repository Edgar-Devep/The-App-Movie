import { useContext, useEffect } from "react";
import { MoviesContext } from "./MoviesContext";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Spinner } from "./Loading";
import { DotsPages } from "./DotsPages";

export const HomeMovie = () => {
  const { movies, nextPage, prevPage, loading, page, setPage } =
    useContext(MoviesContext);

  const totalPages = 10;

  useEffect(() => {
    setPage(0);
  }, [setPage]);

  return (
    <>
      <h2 className="ml-6 my-4 text-2xl font-bold">Populares</h2>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="mx-6 p-2 grid grid-cols-4 gap-3 border-2 border-indigo-600 rounded-2xl relative">
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
          <button
            onClick={prevPage}
            className=" absolute bg-transparent left-3 top-1/2 rounded-full text-white transition-transform duration-500 
                      hover:scale-125 hover:font-bold hover:border border-transparent hover:border-indigo-400"
          >
            <GrPrevious />
          </button>
          <button
            onClick={nextPage}
            className=" absolute bg-transparent right-3 top-1/2 rounded-full text-white transition-transform duration-500 
                      hover:scale-125 hover:font-bold hover:border border-transparent hover:border-indigo-400"
          >
            <GrNext />
          </button>
        </section>
      )}
      <DotsPages totalPages={totalPages} currentPage={page} />
    </>
  );
};
