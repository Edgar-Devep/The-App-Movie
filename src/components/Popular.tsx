import { useContext, useEffect, useState } from "react";
import { MoviesContext, type TypeMovieFetcher } from "../Types/TypesMovies";
import { SkeletonHme } from "../UI/Loading";
import { DotsPages } from "../UI/DotsPages";
import { ButtonPrevAndNext } from "../UI/Button_Prev_Next";
import { ButtonMenu, FavoriteInfo } from "../UI/Menu_Favorite_Info";
import { Link, useLocation } from "react-router-dom";

export const Popular = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [listPopular, setListPopular] = useState<TypeMovieFetcher[]>([]);

  const { popular } = useContext(MoviesContext);

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

  return (
    <>
      <Link to={"/popular"}>
        <h2 className=" inline-flex ml-6 mb-4 mt-6 text-2xl font-bold drop-shadow-[3px_7px_6px_#4E38F3] md:text-3xl hover:text-indigo-500 hover:drop-shadow-[3px_7px_6px_#FFF]">
          Popular
        </h2>
      </Link>
      {loading ? (
        <SkeletonHme loading={loading} col={true} pages={isPopular} />
      ) : (
        <div className="mx-6 relative">
          <section
            className={`h-full relative p-2 border-2 border-indigo-600 rounded-2xl gap-3 ${
              isPopular
                ? "grid grid-cols-4"
                : "flex flex-row border-2 overflow-x-auto"
            }`}
          >
            {listPopular.map((movie) => (
              <article key={movie.id} className="relative md:h-80 shrink-0">
                <div className=" relative">
                  <img
                    className={`rounded-2xl md:h-80 ${isPopular ? "" : "h-32"}`}
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
          {isPopular ? (
            <>
              <ButtonPrevAndNext prevPage={prevPage} nextPage={nextPage} />
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
