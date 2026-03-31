import { useContext, useEffect, useState } from "react";
import { MoviesContext, type TypeMovieFetcher } from "../Types_Custom/TypesMovies";
import { ButtonPrevAndNext } from "../UI/Button_Prev_Next";
import { DotsPages } from "../UI/DotsPages";
import { SkeletonHome } from "../UI/Loading";
import { MovieModal } from "../UI/MovieModal";
import { LogoMovie } from "../UI/LogoMovie";

const STORAGE_KEY_MOVIES = "dailyMovies";
const STORAGE_KEY_DATE = "lastUpdate";
const TOTAL_PAGES = 10;

export const PosterPathPrincipal = () => {
  const [allMovies, setAllMovies] = useState<TypeMovieFetcher[]>([]);
  const [virtualPage, setVirtualPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<TypeMovieFetcher | null>( null );

  const { posterPrincipalTop, trailerKey, trailerMovie } = useContext(MoviesContext);

  const nextPage = () => setVirtualPage((prev) => (prev < TOTAL_PAGES ? prev + 1 : prev));
  const prevPage = () => setVirtualPage((prev) => (prev > 1 ? prev - 1 : prev));

  const currentMovie = allMovies[virtualPage - 1] ?? null;

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);

      try {
        const today = new Date().toDateString();
        const lastUpdate = localStorage.getItem(STORAGE_KEY_DATE);
        const cachedMovies = localStorage.getItem(STORAGE_KEY_MOVIES);

        if (lastUpdate === today && cachedMovies) {
          const parsed: TypeMovieFetcher[] = JSON.parse(cachedMovies);

          if (parsed.length === TOTAL_PAGES) {
            setAllMovies(parsed);
            return;
          }
        }

        const data = await posterPrincipalTop(1);
        const totalPagesApi = data.total_pages;
        const pageRandom = Math.floor(Math.random() * Math.min(totalPagesApi, 500)) + 1;

        const dataRandom = await posterPrincipalTop(pageRandom);

        if (dataRandom?.results) {
          const movies = dataRandom.results.slice(0, TOTAL_PAGES);
          setAllMovies(movies);
          localStorage.setItem(STORAGE_KEY_MOVIES, JSON.stringify(movies));
          localStorage.setItem(STORAGE_KEY_DATE, today);
        } else {
          setAllMovies([]);
        }
      } catch (error) {
        console.error("Error al traer películas", error);
        setAllMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [posterPrincipalTop]);

  const handleMovieSelect = async (movie: TypeMovieFetcher) => {
    setSelectedMovie(movie);
    await trailerMovie(movie.id);
  };

  return (
    <>
      {loading ? (
        <SkeletonHome loading={loading} col={false} />
      ) : (
        <>
          <section className="flex flex-row">
            {currentMovie && (
              <article
                key={currentMovie.id}
                className="w-full h-full relative shrink-0"
              >
                <div
                  className="absolute md:hidden "
                >
                  <LogoMovie />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleMovieSelect(currentMovie)}
                >
                  <img
                    className="w-full h-auto"
                    src={
                      currentMovie.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500${currentMovie.backdrop_path}`
                        : "/no_disponible.png"
                    }
                    alt={currentMovie.title || "Poster no disponible"}
                    title={currentMovie.title}
                  />

                  <div className="absolute bottom-0 left-0 w-full gap-y-2 px-3 pb-2.5 bg-black/60 text-white">
                    <div className="text-center">
                      <h2 className="inline-block px-8 line-clamp-1 text-lg font-bold md:text-2xl lg:text-3xl">
                        {currentMovie.title}
                      </h2>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-md md:text-lg lg:text-xl">
                        ⭐ {currentMovie.popularity.toFixed(1)}
                      </span>
                      <span className="text-md md:text-lg lg:text-xl">
                        {currentMovie.release_date}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-md md:line-clamp-3 md:text-lg lg:text-xl">
                      {currentMovie.overview}
                    </p>
                  </div>
                </div>
                <ButtonPrevAndNext
                  prevPage={prevPage}
                  nextPage={nextPage}
                  disabledPrev={virtualPage === 1}
                />
              </article>
            )}
          </section>

          <DotsPages totalPages={TOTAL_PAGES} currentPage={virtualPage} />

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
      )}
    </>
  );
};
