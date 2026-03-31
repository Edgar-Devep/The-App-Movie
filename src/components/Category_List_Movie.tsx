import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MoviesContext, type TypeMovieFetcher } from "../Types_Custom/TypesMovies";
import { SkeletonHome } from "../UI/Loading";
import { ButtonPrevAndNext } from "../UI/Button_Prev_Next";
import { DotsPages } from "../UI/DotsPages";
import { ButtonMenu, FavoriteInfo } from "../UI/Menu_Favorite_Info";
import { MovieModal } from "../UI/MovieModal";
import { LogoMovie } from "../UI/LogoMovie";

export const CategoryForMovie = () => {
  const [movies, setMovies] = useState<TypeMovieFetcher[]>([]);
  const [openId, setOpenId] = useState<number | string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<TypeMovieFetcher | null>( null );

  const { id, name } = useParams<{ id: string; name: string }>();
  const { categoriesForId, trailerKey, trailerMovie } = useContext(MoviesContext);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      document.documentElement.scrollTop = 0;
      const data = await categoriesForId(Number(id), page);
      setMovies(data || []);
      setLoading(false);
    };
    fetchMovies();
  }, [id, page, categoriesForId]);

  const handleMovieSelect = async (movie: TypeMovieFetcher) => {
    setSelectedMovie(movie);
    await trailerMovie(movie.id);
  };

  return (
    <>
      <div className="flex justify-center pt-6 md:hidden">
        <LogoMovie />
      </div>
      <h2 className="title_componentes mt-10 md:mt-44 mb-10" title={name}>
        {name}
      </h2>
      {loading ? (
        <SkeletonHome loading={loading} col={true} pages={true} />
      ) : (
        <div className="mx-6 relative">
          <section className="section_poster grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <article key={movie.id} className="relative">
                <div className=" relative w-full">
                  <img
                    className="h-64 md:h-72 lg:h-96 rounded-lg w-full"
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
          <ButtonPrevAndNext
            prevPage={prevPage}
            nextPage={nextPage}
            disabledPrev={page === 1}
          />
        </div>
      )}
      <DotsPages totalPages={10} currentPage={page} />

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
