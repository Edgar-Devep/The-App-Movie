import { useContext, useEffect, useState } from "react";
import { MoviesContext, type TypeMovieFetcher } from "../Types/TypesMovies";
import { SkeletonHme } from "../UI/Loading";
import { DotsPages } from "../UI/DotsPages";
import { ButtonPrevAndNext } from "../UI/Button_Prev_Next";
import { ButtonMenu, FavoriteInfo } from "../UI/Menu_Favorite_Info";
import { Link, useLocation } from "react-router-dom";

export const TrendingMovie = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<TypeMovieFetcher[]>([]);

  const { trendingMovieHome } = useContext(MoviesContext);

  const location = useLocation();
  const isTrendingPage = location.pathname === "/trending";

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));

  useEffect(() => {
    const trend = async () => {
      setLoading(true);
      const respuesta = await trendingMovieHome(page);
      setMovies(respuesta);
      setLoading(false);
    };
    trend();
  }, [page]);

  return (
    <>
      <Link to={"/trending"}>
        <h2 className=" inline-flex ml-6 mb-4 mt-6 text-2xl font-bold drop-shadow-[3px_7px_6px_#4E38F3] md:text-3xl hover:text-indigo-500 hover:drop-shadow-[3px_7px_6px_#FFF]">
          Trending
        </h2>
      </Link>
      {loading ? (
        <SkeletonHme loading={loading} col={true} pages={isTrendingPage} />
      ) : (
        <div className="mx-6 relative">
          <section
            className={`relative h-full p-2 gap-3 border-2 border-indigo-600 rounded-2xl ${
              isTrendingPage
                ? " grid grid-cols-4"
                : "flex flex-row overflow-x-auto"
            }`}
          >
            {movies.map((movie) => (
              <article key={movie.id} className="relative md:h-80 shrink-0">
                <div className=" relative">
                  <img
                    className={`rounded-2xl md:h-80 ${
                      isTrendingPage ? "" : "h-32"
                    }`}
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
          {isTrendingPage ? (
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
