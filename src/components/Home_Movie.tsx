import { useContext, useEffect, useState } from "react";
import { MoviesContext } from "./Types/TypesMovies";
import { GrNext, GrPrevious } from "react-icons/gr";
import { CiMenuKebab } from "react-icons/ci";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Spinner } from "./UI/Loading";
import { DotsPages } from "./UI/DotsPages";

export const HomeMovie = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const { movies, nextPage, prevPage, loading, page, setPage } =
    useContext(MoviesContext);

  const totalPages = 10;

  useEffect(() => {
    setPage(1);
  }, [setPage]);

  return (
    <>
      <h2 className="ml-6 my-4 text-2xl font-bold drop-shadow-[3px_7px_6px_#4E38F3]">
        Populares
      </h2>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="mx-6 p-2 grid grid-cols-4 gap-3 border-2 border-indigo-600 rounded-2xl relative">
          {movies.map((movie) => (
            <article key={movie.id} className="relative">
              <div className=" relative">
                <img
                  className=" rounded-2xl"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  title={movie.title}
                />
                <button
                  className="absolute top-2 right-2 bg-black/50 rounded-full"
                  onClick={() =>
                    setOpenId(openId === movie.id ? null : movie.id)
                  }
                >
                  <CiMenuKebab className="text-white" />
                </button>
              </div>
              {openId === movie.id && (
                <div className="flex flex-col absolute top-7 right-1 bg-black/80 shadow-lg rounded-md p-2 w-12 z-10">
                  <button
                    onClick={() => setOpenId(null)}
                    className="flex items-center px-2 py-1 hover:bg-red-200 rounded cursor-pointer"
                    title="Favoritos"
                  >
                    <MdFavoriteBorder className="text-red-700" />
                  </button>
                  <button
                    onClick={() => setOpenId(null)}
                    className="flex items-center px-2 py-1 hover:bg-yellow-200 rounded cursor-pointer"
                    title="Información"
                  >
                    <IoMdInformationCircleOutline className="text-yellow-700" />
                  </button>
                </div>
              )}
            </article>
          ))}

          <button
            onClick={prevPage}
            className=" absolute bg-indigo-400 left-3 top-1/2 rounded-full text-white transition-transform duration-500 
                      hover:scale-125 hover:font-bold hover:border border-transparent hover:border-indigo-400"
          >
            <GrPrevious />
          </button>
          <button
            onClick={nextPage}
            className=" absolute bg-indigo-400 right-3 top-1/2 rounded-full text-white transition-transform duration-500 
                      hover:scale-125 hover:font-bold hover:border border-transparent hover:border-indigo-400"
          >
            <GrNext />
          </button>
        </section>
      )}
      <DotsPages totalPages={totalPages} currentPage={page} />
    </>
  );
};
