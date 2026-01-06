import { useContext } from "react";
import { MoviesContext } from "./MoviesContext";
import { SkeletonHme } from "./Loading";

export const ComingSoon = () => {
  const { upComingMovie: udComing, loading } = useContext(MoviesContext);

  return (
    <>
      <h2 className="ml-6 m-4 text-2xl font-bold">Próximamente</h2>
      {loading ? (
        <SkeletonHme loading={loading} />
      ) : (
        <section className="mx-6 p-2 flex flex-row gap-3 border-2 border-indigo-600 rounded-2xl overflow-x-auto">
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
      )}
    </>
  );
};
