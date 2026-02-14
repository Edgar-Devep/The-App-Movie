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

export const Popular = () => {
  const [openId, setOpenId] = useState<number | string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [listPopular, setListPopular] = useState<TypeMovieFetcher[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<TypeMovieFetcher | null>(
    null,
  );

  const { popular, trailerMovie, trailerKey } = useContext(MoviesContext);

  const location = useLocation();
  const isPopular = location.pathname === "/popular";

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));

  useEffect(() => {
    const populares = async () => {
      setLoading(true);
      const respuesta = await popular(page);
      setListPopular(respuesta);
      setLoading(false);
    };
    populares();
  }, [page]);

  const handleMovieSelect = async (movie: TypeMovieFetcher) => {
    setSelectedMovie(movie);
    await trailerMovie(movie.id);
  };

  return (
    <>
      <Link to={"/popular"}>
        <h2 className="title-componentes">Popular</h2>
      </Link>
      {loading ? (
        <SkeletonHome loading={loading} col={true} pages={isPopular} />
      ) : (
        <div className="mx-6 relative">
          <section
            className={`section-poster ${
              isPopular
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                : " h-full flex flex-row overflow-x-auto"
            }`}
          >
            {listPopular.map((movie) => (
              <article
                key={movie.id}
                className={`relative ${!isPopular ? "shrink-0" : ""}`}
              >
                <div className=" relative w-full">
                  <img
                    className={`rounded-lg w-full  ${
                      isPopular ? "h-64 md:h-72 lg:h-96" : "h-44 md:h-72"
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
          {isPopular ? (
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
      {isPopular ? <DotsPages totalPages={10} currentPage={page} /> : ""}
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
