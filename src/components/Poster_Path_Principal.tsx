import { useContext, useEffect, useState } from "react";
import {
  MoviesContext,
  type TypeMovieFetcher,
} from "../Types_Custom/TypesMovies";
import { ButtonPrevAndNext } from "../UI/Button_Prev_Next";
import { DotsPages } from "../UI/DotsPages";
import { SkeletonHome } from "../UI/Loading";
import { MovieModal } from "../UI/MovieModal";

export const PosterPathPrincipal = () => {
  const [topMovie, setTopMovie] = useState<TypeMovieFetcher[]>([]);
  const [virtualPage, setVirtualPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<TypeMovieFetcher | null>(
    null,
  );

  const { posterPrincipalTop, trailerKey, trailerMovie } =
    useContext(MoviesContext);

  const totalPages = 6;

  const nextPage = () =>
    setVirtualPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setVirtualPage((prev) => (prev > 1 ? prev - 1 : prev));

  useEffect(() => {
    const poster = async () => {
      setLoading(true);
      try {
        const data = await posterPrincipalTop(1);
        const totalPagesApi = data.total_pages;
        const pageRandom =
          Math.floor(Math.random() * Math.min(totalPagesApi, 500)) + 1;

        const dataRandom = await posterPrincipalTop(pageRandom);

        if (dataRandom?.results) {
          const start = (virtualPage - 1) * 1;
          const end = start + 1;
          setTopMovie(dataRandom.results.slice(start, end));
        } else {
          setTopMovie([]);
        }
      } catch (error) {
        console.error("Error al traer película", error);
        setTopMovie([]);
      } finally {
        setLoading(false);
      }
    };
    poster();
  }, [virtualPage]);

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
            {topMovie.map((movie) => {
              return (
                <article
                  key={movie.id}
                  className="w-full h-full relative shrink-0"
                >
                  <img
                    className="w-full h-auto"
                    src={
                      movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                        : "/no_disponible.png"
                    }
                    alt={movie.title || "Poster no disponible"}
                    title={movie.title}
                  />
                  <ButtonPrevAndNext
                    prevPage={prevPage}
                    nextPage={nextPage}
                    disabledPrev={virtualPage === 1}
                  />

                  <div className="absolute bottom-0 left-0 w-full gap-y-2 px-3 pb-2.5 bg-black/60 text-white">
                    <div className="text-center ">
                      <h2
                        className="inline-block px-8 line-clamp-1 text-lg font-bold md:text-2xl lg:text-3xl hover:text-indigo-500 cursor-pointer"
                        onClick={() => handleMovieSelect(movie)}
                      >
                        {movie.title}
                      </h2>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-md md:text-lg lg:text-xl">
                        ⭐ {movie.popularity.toFixed(1)}
                      </span>
                      <span className="text-md md:text-lg lg:text-xl">
                        {movie.release_date}
                      </span>
                    </div>
                    <p className=" line-clamp-2 text-md md:line-clamp-3 md:text-lg lg:text-xl">
                      {movie.overview}
                    </p>
                  </div>
                </article>
              );
            })}
          </section>
          <DotsPages totalPages={totalPages} currentPage={virtualPage} />
          {selectedMovie && (
            <MovieModal
              movie={selectedMovie}
              isOpen={!!selectedMovie}
              onClose={() => setSelectedMovie(null)}
            />
          )}
        </>
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
