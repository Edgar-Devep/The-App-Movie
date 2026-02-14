import { useContext, useEffect, useState } from "react";
import { MoviesContext, type TypeMovieFetcher, } from "../Types_Custom/TypesMovies";
import { SkeletonHome } from "../UI/Loading";
import { DotsPages } from "../UI/DotsPages";
import { ButtonPrevAndNext } from "../UI/Button_Prev_Next";
import { ButtonMenu, FavoriteInfo } from "../UI/Menu_Favorite_Info";
import { Link, useLocation } from "react-router-dom";
import { MovieModal } from "../UI/MovieModal";

export const TrendingMovie = () => {
  const [movies, setMovies] = useState<TypeMovieFetcher[]>([]);
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<number | string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<TypeMovieFetcher | null>( null, );

  const { trendingMovieHome, trailerKey, trailerMovie } =
    useContext(MoviesContext);

  const location = useLocation();
  const isTrendingPage = location.pathname === "/trending";

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));

  useEffect(() => {
    const trend = async () => {
      setLoading(true);
      const respuesta = await trendingMovieHome(page);
      setMovies(respuesta);
      setLoading(false);
    };
    trend();
  }, [page]);

  const handleMovieSelect = async (movie: TypeMovieFetcher) => {
    setSelectedMovie(movie);
    await trailerMovie(movie.id);
  };

  return (
    <>
      <Link to={"/trending"}>
        <h2 className="title-componentes">Trending</h2>
      </Link>
      {loading ? (
        <SkeletonHome loading={loading} col={true} pages={isTrendingPage} />
      ) : (
        <div className="mx-6 relative">
          <section
            className={`section-poster ${
              isTrendingPage
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                : " h-full flex flex-row overflow-x-auto"
            }`}
          >
            {movies.map((movie) => (
              <article
                key={movie.id}
                className={`relative ${
                  !isTrendingPage ? "shrink-0" : ""
                }`}
              >
                <div className="relative w-full">
                  <img
                    className={`rounded-lg w-full  ${
                      isTrendingPage ? "h-64 md:h-72 lg:h-96" : "h-44 md:h-72"
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
          {isTrendingPage && (
            <ButtonPrevAndNext
              prevPage={prevPage}
              nextPage={nextPage}
              disabledPrev={page === 1}
            />
          )}
        </div>
      )}
      {isTrendingPage && <DotsPages totalPages={10} currentPage={page} />}

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
