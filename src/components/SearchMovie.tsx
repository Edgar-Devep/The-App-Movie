import React, { useContext, useEffect, useState } from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { MoviesContext, type TypeMovieFetcher } from "../Types/TypesMovies";
import { ButtonMenu, FavoriteInfo } from "../UI/Menu_Favorite_Info";
import { SkeletonHme } from "../UI/Loading";

export const SearchMovie = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [listMovies, setListMovies] = useState("");
  const [loading, setLoading] = useState(true);
  const [page] = useState(1);
  const [searchResults, setSearchResults] = useState<TypeMovieFetcher[]>([]);
  const [movies, setMovies] = useState<TypeMovieFetcher[]>([]);

  const { searchMovies, trendingMovieHome } = useContext(MoviesContext);

  const bestMovie = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    const value = event.target.value;
    setListMovies(value);
    if (value.length > 2) {
      const results = await searchMovies(value);
      setSearchResults(results);
      setLoading(false);
    } else {
      setSearchResults([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      const respuesta = await trendingMovieHome(page);
      setMovies(respuesta);
      setLoading(false);
    };
    search();
  }, [page]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // 👇 si hay texto, usamos searchResults; si no, usamos movies
  const filterMovies = listMovies.length > 2 ? searchResults : movies;

  return (
    <>
      <div className="flex justify-center px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center w-full h-12 md:w-90 p-6 bg-indigo-400 rounded-lg"
        >
          <button type="submit" className="pr-2">
            <RiUserSearchLine />
          </button>
          <input
            value={listMovies}
            onChange={bestMovie}
            type="search"
            id="search"
            placeholder="Encuentra péliculas, series y más"
            autoComplete="off"
            className=" outline-none w-full md:w-72 placeholder:text-sm"
          />
        </form>
      </div>
      {loading ? (
        <SkeletonHme loading={loading} col={true} />
      ) : (
        <section className="mx-6 p-2 grid grid-cols-4 gap-3 border-2 border-indigo-600 rounded-2xl relative">
          {filterMovies.map((movie) => (
            <article key={movie.id} className="relative">
              <div className=" relative">
                <img
                  className=" rounded-2xl"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  title={movie.title}
                />
                <ButtonMenu
                  movieId={movie.id}
                  openId={openId}
                  setOpenId={setOpenId}
                />
              </div>
              <FavoriteInfo
                movieId={movie.id}
                openId={openId}
                setOpenId={setOpenId}
              />
            </article>
          ))}
        </section>
      )}
    </>
  );
};
