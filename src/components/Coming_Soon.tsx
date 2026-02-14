import { useContext, useEffect, useState } from "react";
import {
  MoviesContext,
  type TypeMovieFetcher,
} from "../Types_Custom/TypesMovies";
import { SkeletonHome } from "../UI/Loading";
import { DotsPages } from "../UI/DotsPages";
import { ButtonPrevAndNext } from "../UI/Button_Prev_Next";
import { ButtonMenu, FavoriteInfo } from "../UI/Menu_Favorite_Info";
import { Link, useLocation } from "react-router-dom";
import { MovieModal } from "../UI/MovieModal";

export const ComingSoon = () => {
  const [openId, setOpenId] = useState<number | string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [upComingMovie, setUpComingMovie] = useState<TypeMovieFetcher[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<TypeMovieFetcher | null>(
    null,
  );

  const { unCominggMovie, trailerMovie, trailerKey } =
    useContext(MoviesContext);

  const location = useLocation();
  const isComingSoonPage = location.pathname === "/coming-soon";

  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));
  const nextPage = () => setPage((prev) => prev + 1);

  useEffect(() => {
    const soon = async () => {
      setLoading(true);
      const respuesta = await unCominggMovie(page);
      setUpComingMovie(respuesta);
      setLoading(false);
    };
    soon();
  }, [page]);

  const handleMovieSelect = async (movie: TypeMovieFetcher) => {
    setSelectedMovie(movie);
    await trailerMovie(movie.id);
  };

  return (
    <>
      <Link to={"/coming-soon"}>
        <h2 className="title-componentes">Coming Soon</h2>
      </Link>
      {loading ? (
        <SkeletonHome loading={loading} col={true} pages={isComingSoonPage} />
      ) : (
        <div className="mx-6 relative">
          <section
            className={`section-poster ${
              isComingSoonPage
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                : " h-full flex flex-row overflow-x-auto"
            }`}
          >
            {upComingMovie.map((movie) => (
              <article
                key={movie.id}
                className={`relative ${!isComingSoonPage ? "shrink-0" : ""}`}
              >
                <div className=" relative w-full">
                  <img
                    className={`rounded-lg w-full  ${
                      isComingSoonPage ? "h-64 md:h-72 lg:h-96" : "h-44 md:h-72"
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
          {isComingSoonPage ? (
            <ButtonPrevAndNext
              prevPage={prevPage}
              nextPage={nextPage}
              disabledPrev={page === 1}
            />
          ) : (
            ""
          )}
        </div>
      )}
      {isComingSoonPage ? <DotsPages totalPages={10} currentPage={page} /> : ""}

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
