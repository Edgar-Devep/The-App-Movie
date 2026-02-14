import React, { useContext, useEffect, useState } from "react";
import { RiUserSearchLine } from "react-icons/ri";
import {
  MoviesContext,
  type TypeMovieFetcher,
} from "../Types_Custom/TypesMovies";
import { ButtonMenu, FavoriteInfo } from "../UI/Menu_Favorite_Info";
import { SkeletonHome } from "../UI/Loading";
import { MovieModal } from "../UI/MovieModal";

export const SearchMovie = () => {
  const [movies, setMovies] = useState<TypeMovieFetcher[]>([]);
  const [openId, setOpenId] = useState<number | string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page] = useState(1);
  const [listMovies, setListMovies] = useState("");
  const [searchResults, setSearchResults] = useState<TypeMovieFetcher[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<TypeMovieFetcher | null>(
    null,
  );

  const { searchMovies, trendingMovieHome, trailerKey, trailerMovie } =
    useContext(MoviesContext);

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

  const filterMovies = listMovies.length > 2 ? searchResults : movies;

  const handleMovieSelect = async (movie: TypeMovieFetcher) => {
    setSelectedMovie(movie);
    await trailerMovie(movie.id);
  };

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
        <SkeletonHome loading={loading} col={true} />
      ) : (
        <div className="mx-6 relative">
          <section className="section-poster grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filterMovies.map((movie) => (
              <article key={movie.id} className="relative">
                <div className=" relative w-full">
                  <img
                    className="w-full rounded-lg h-64 md:h-72 lg:h-96"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/no_disponible.png"
                    }
                    alt={movie.title || "Poster no disponible"}
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
                  onInfoClick={() => handleMovieSelect(movie)}
                />
              </article>
            ))}
          </section>
        </div>
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
          trailerKey={trailerKey}
          onPlayTrailer={() => trailerMovie(selectedMovie.id)}
        />
      )}
    </>
  );
};
