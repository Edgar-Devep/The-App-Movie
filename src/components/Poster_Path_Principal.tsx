import { useContext, useEffect, useState } from "react";
import { MoviesContext, type TypeMovieFetcher } from "../Types/TypesMovies";
import { ButtonPrevAndNext } from "../UI/Button_Prev_Next";
import { DotsPages } from "../UI/DotsPages";
import { SkeletonHme } from "../UI/Loading";

export const PosterPathPrincipal = () => {
  const [topMovie, setTopMovie] = useState<TypeMovieFetcher[]>([]);
  const { PosterPrincipalTop, nextPage, prevPage, page, loading } =
    useContext(MoviesContext);

  const totalPages = 6;

  useEffect(() => {
    const poster = async () => {
      const results = await PosterPrincipalTop();
      setTopMovie(results.slice(6, 12));
    };
    poster();
  }, []);

  return (
    <>
      {loading ? (
        <SkeletonHme loading={loading} col={false} />
      ) : (
        <>
          <section className="flex flex-row overflow-x-auto">
            {topMovie.map((movie) => {
              return (
                <article
                  key={movie.id}
                  className="w-full h-full relative shrink-0"
                >
                  <img
                    className="w-full h-auto"
                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                  <ButtonPrevAndNext prevPage={prevPage} nextPage={nextPage} />

                  <div className="absolute bottom-0 left-0 w-full h-auto p-2 bg-black/60 text-white">
                    <h2 className=" line-clamp-1 text-sm font-bold md:text-lg">
                      {movie.title}
                    </h2>
                    <div className="flex flex-col">
                      <span className="text-xs md:text-sm">
                        ⭐ {movie.popularity.toFixed(1)}
                      </span>
                      <span className="text-xs">{movie.release_date}</span>
                    </div>
                    <p className=" line-clamp-2 text-xs md:line-clamp-3 md:text-md">
                      {movie.overview}
                    </p>
                  </div>
                </article>
              );
            })}
          </section>
          <DotsPages totalPages={totalPages} currentPage={page} />
        </>
      )}
    </>
  );
};
