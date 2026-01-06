import React, { useContext, useEffect, useState } from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { MoviesContext, type TypeMovieFetcher } from "./MoviesContext";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Spinner } from "./Loading";
import { DotsPages } from "./DotsPages";

export const SearchMovie = () => {
  const { movies, nextPage, prevPage, page, setPage, searchMovies, loading } =
    useContext(MoviesContext);
  const [listMovies, setListMovies] = useState("");
  const [searchResults, setSearchResults] = useState<TypeMovieFetcher[]>([]);

  const totalPages = 10;

  useEffect(() => {
    setPage(0);
  }, [setPage]);

  const bestMovie = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setListMovies(value);
    if (value.length > 2) {
      const results = await searchMovies(value);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // 👇 si hay texto, usamos searchResults; si no, usamos movies
  const filterMovies = listMovies.length > 2 ? searchResults : movies;

  return (
    <>
      <div className="flex justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center w-56 h-12 p-6 bg-indigo-400 rounded-lg"
        >
          <button type="submit" className="px-2">
            <RiUserSearchLine />
          </button>
          <input
            value={listMovies}
            onChange={bestMovie}
            type="search"
            id="search"
            placeholder="Movies..."
            autoComplete="off"
            className=" outline-none pr-4 w-44"
          />
        </form>
      </div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="mx-6 p-2 grid grid-cols-4 gap-3 border-2 border-indigo-600 rounded-2xl relative">
          {filterMovies.map((movie) => (
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
