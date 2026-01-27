import { useContext, useEffect, useState } from "react";
import { MoviesContext, type TypeMovieFetcher } from "../Types/TypesMovies";
import { SkeletonHme } from "../UI/Loading";
import { DotsPages } from "../UI/DotsPages";
import { ButtonPrevAndNext } from "../UI/Button_Prev_Next";
import { ButtonMenu, FavoriteInfo } from "../UI/Menu_Favorite_Info";
import { Link, useLocation } from "react-router-dom";

export const ComingSoon = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [upComingMovie, setUpComingMovie] = useState<TypeMovieFetcher[]>([]);

  const { unCominggMovie } = useContext(MoviesContext);

  const location = useLocation();
  const isComingSoonPage = location.pathname === "/coming-soon";

  const prevPageUpComing = () =>
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  const nextPageUpComing = () => setPage((prev) => prev + 1);

  useEffect(() => {
    const soon = async () => {
      setLoading(true);
      const respuesta = await unCominggMovie(page);
      setUpComingMovie(respuesta);
      setLoading(false);
    };
    soon();
  }, [page]);

  return (
    <>
      <Link to={"/coming-soon"}>
        <h2 className=" inline-flex ml-6 mb-4 mt-6 text-2xl font-bold drop-shadow-[3px_7px_6px_#4E38F3] md:text-3xl hover:text-indigo-500 hover:drop-shadow-[3px_7px_6px_#FFF]">
          Coming Soon
        </h2>
      </Link>
      {loading ? (
        <SkeletonHme loading={loading} col={true} pages={isComingSoonPage} />
      ) : (
        <div className="mx-6 relative">
          <section
            className={`h-full relative p-2 gap-3 border-2 border-indigo-600 rounded-2xl ${
              isComingSoonPage
                ? "grid grid-cols-4"
                : "flex flex-row overflow-x-auto"
            }`}
          >
            {upComingMovie.map((movie) => (
              <article key={movie.id} className="relative md:h-80 shrink-0">
                <div className=" relative">
                  <img
                    className={`rounded-2xl md:h-80 ${
                      isComingSoonPage ? "" : "h-32"
                    }`}
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
          {isComingSoonPage ? (
            <>
              <ButtonPrevAndNext
                prevPage={prevPageUpComing}
                nextPage={nextPageUpComing}
              />
              <DotsPages totalPages={10} currentPage={page} />
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};
