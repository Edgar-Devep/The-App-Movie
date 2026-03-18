import { Link, useLocation } from "react-router-dom";
import { SkeletonHome } from "./Loading";
import { ButtonMenu, FavoriteInfo } from "./Menu_Favorite_Info";
import { ButtonPrevAndNext } from "./Button_Prev_Next";
import { DotsPages } from "./DotsPages";
import { MovieModal } from "./MovieModal";
import { useContext, useEffect, useState } from "react";
import { MoviesContext, type MovieListProps, type TypeMovieFetcher } from "../Types_Custom/TypesMovies";
import { LogoMovie } from "./LogoMovie";

export const MovieList = ({ title, path, fetchMovies }: MovieListProps) => {
  const [movies, setMovies] = useState<TypeMovieFetcher[]>([]);
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<number | string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<TypeMovieFetcher | null>( null );

  const { trailerKey, trailerMovie } = useContext(MoviesContext);

  const location = useLocation();
  const isCurrentPage = location.pathname === path;

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      document.documentElement.scrollTop = 0;
      const respuesta = await fetchMovies(page);
      setMovies(respuesta);
      setLoading(false);
    };
    fetchData();
  }, [page, fetchMovies]);

  const handleMovieSelect = async (movie: TypeMovieFetcher) => {
    setSelectedMovie(movie);
    await trailerMovie(movie.id);
  };

  return (
    <>
     {isCurrentPage && 
        <div className="flex justify-center md:hidden">
          <LogoMovie />
        </div>
      }
      <Link to={path}>
        <h2
          className={`title_componentes ${isCurrentPage ? "mt-20 md:mt-44 mb-10" : "m-6"}`}
          title={title}
        >
          {title}
        </h2>
      </Link>

      {loading ? (
        <SkeletonHome loading={loading} col={true} pages={isCurrentPage} />
      ) : (
        <div className="mx-6 relative">
          <section
            className={`section_poster ${
              isCurrentPage
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                : " h-full flex flex-row overflow-x-auto"
            }`}
          >
            {movies.map((movie) => (
              <article
                key={movie.id}
                className={`relative ${!isCurrentPage ? "shrink-0" : ""}`}
              >
                <div className="relative w-full">
                  <img
                    className={`rounded-lg w-full ${
                      isCurrentPage ? "h-64 md:h-72 lg:h-96" : "h-44 md:h-72"
                    }`}
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
          {isCurrentPage ? (
            <ButtonPrevAndNext
              prevPage={prevPage}
              nextPage={nextPage}
              disabledPrev={page === 1}
            />
          ) : null}
        </div>
      )}

      {isCurrentPage ? <DotsPages totalPages={10} currentPage={page} /> : null}

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
