import { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../Types/TypesMovies";
import { SkeletonHme } from "../UI/Loading";
import { DotsPages } from "../UI/DotsPages";
import { ButtonPrevAndNext } from "../UI/Button_Prev_Next";
import { ButtonMenu, FavoriteInfo } from "../UI/Menu_Favorite_Info";
import { Link } from "react-router-dom";

export const HomeMovie = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const { movies, nextPage, prevPage, loading, page, setPage } =
    useContext(MoviesContext);

  const totalPages = 6;

  useEffect(() => {
    setPage(1);
  }, [setPage]);

  return (
    <>
      <Link to={"/Populares"}>
        <h2 className=" inline-flex ml-6 my-4 text-2xl font-bold drop-shadow-[3px_7px_6px_#4E38F3] md:text-3xl hover:text-indigo-500 hover:drop-shadow-[3px_7px_6px_#FFF]">
          Populares
        </h2>
      </Link>
      {loading ? (
        <SkeletonHme loading={loading} col={true} />
      ) : (
        <div className="mx-6 relative">
          <section className="h-full relative p-2 flex flex-row gap-3 border-2 border-indigo-600 rounded-2xl overflow-x-auto ">
            {movies.map((movie) => (
              <article key={movie.id} className=" md:h-80 shrink-0 relative">
                <div className=" relative">
                  <img
                    className=" h-32 md:h-80 rounded-2xl"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
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
                />
              </article>
            ))}

          </section>
            <ButtonPrevAndNext prevPage={prevPage} nextPage={nextPage} />
          <DotsPages totalPages={totalPages} currentPage={page} />
        </div>
      )}
    </>
  );
};
