import { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../Types/TypesMovies";
import { SkeletonHme } from "../UI/Loading";
import { DotsPages } from "../UI/DotsPages";
import { ButtonPrevAndNext } from "../UI/Button_Prev_Next";
import { ButtonMenu, FavoriteInfo } from "../UI/Menu_Favorite_Info";
import { Link, useLocation } from "react-router-dom";

export const ComingSoon = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const {
    upComingMovie: udComing,
    loading,
    pageUpComing,
    setPageUpComing,
    prevPageUpComing,
    nextPageUpComing,
  } = useContext(MoviesContext);

  const location = useLocation();
  const isComingSoonPage = location.pathname === "/coming-soon";

  useEffect(() => {
    setPageUpComing(1);
  }, [setPageUpComing]);

  return (
    <>
      <Link to={"/coming-soon"}>
        <h2 className=" inline-flex ml-6 mb-4 mt-6 text-2xl font-bold drop-shadow-[3px_7px_6px_#4E38F3] md:text-3xl hover:text-indigo-500 hover:drop-shadow-[3px_7px_6px_#FFF]">
          Coming Soon
        </h2>
      </Link>
      {loading ? (
        <SkeletonHme loading={loading} col={true} />
      ) : isComingSoonPage ? (
        <div className="mx-6 relative">
          <section className="h-full relative p-2 grid grid-cols-4 gap-3 border-2 border-indigo-600 rounded-2xl">
            {udComing.map((movie) => (
              <article key={movie.id} className="relative">
                <div className=" relative">
                  <img
                    className="rounded-2xl "
                    src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
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
          <ButtonPrevAndNext
            prevPage={prevPageUpComing}
            nextPage={nextPageUpComing}
          />
          <DotsPages totalPages={10} currentPage={pageUpComing} />
        </div>
      ) : (
        <div className="mx-6 relative">
          <section className="h-full relative p-2 flex flex-row gap-3 border-2 border-indigo-600 rounded-2xl overflow-x-auto ">
            {udComing.map((movie) => (
              <article key={movie.id} className=" md:h-80 shrink-0 relative">
                <div className=" relative">
                  <img
                    className="h-32 md:h-80 rounded-2xl "
                    src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
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
          <ButtonPrevAndNext
            prevPage={prevPageUpComing}
            nextPage={nextPageUpComing}
          />
          <DotsPages totalPages={6} currentPage={pageUpComing} />
        </div>
      )}
    </>
  );
};
