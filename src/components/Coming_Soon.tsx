import { useContext, useEffect } from "react";
import { MoviesContext } from "./Types/TypesMovies";
import { SkeletonHme } from "./UI/Loading";
import { DotsPages } from "./UI/DotsPages";
import { GrNext, GrPrevious } from "react-icons/gr";

export const ComingSoon = () => {
  const {
    upComingMovie: udComing,
    loading,
    prevPageUpComing,
    nextPageUpComing,
    pageUpComing,
    setPageUpComing,
  } = useContext(MoviesContext);

  const totalPages = 5;

  useEffect(() => {
    setPageUpComing(1);
  }, [setPageUpComing]);

  return (
    <>
      <h2 className="ml-6 m-4 text-2xl font-bold drop-shadow-[3px_7px_6px_#4E38F3]">Próximamente</h2>
      {loading ? (
        <SkeletonHme loading={loading} />
      ) : (
        <div className="mx-6 relative">
          <section className=" p-2 flex flex-row gap-3 border-2 border-indigo-600 rounded-2xl overflow-x-auto ">
            {udComing.map((movie) => (
              <article key={movie.id} className="shrink-0">
                <img
                  className="h-32 rounded-2xl "
                  src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                  alt={movie.title}
                  title={movie.title}
                />
              </article>
            ))}
          </section>
          <button
            onClick={prevPageUpComing}
            className="absolute left-3 top-1/2 bg-indigo-400 rounded-full text-white transition-transform duration-500 
                            hover:scale-125 hover:font-bold hover:border border-transparent hover:border-indigo-400"
          >
            <GrPrevious />
          </button>
          <button
            onClick={nextPageUpComing}
            className="absolute bg-indigo-400 right-3 top-1/2 rounded-full text-white transition-transform duration-500 
                            hover:scale-125 hover:font-bold hover:border border-transparent hover:border-indigo-400"
          >
            <GrNext />
          </button>
        </div>
      )}

      <DotsPages totalPages={totalPages} currentPage={pageUpComing} />
    </>
  );
};
