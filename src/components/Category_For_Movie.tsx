import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MoviesContext, type TypeMovieFetcher } from "../Types/TypesMovies";
import { SkeletonHme } from "../UI/Loading";
import { ButtonPrevAndNext } from "../UI/Button_Prev_Next";
import { DotsPages } from "../UI/DotsPages";
import { ButtonMenu, FavoriteInfo } from "../UI/Menu_Favorite_Info";

export const CategoryForMovie = () => {
  const { id, name } = useParams<{ id: string; name: string }>();
  const { categoriesForId } = useContext(MoviesContext);

  const [movies, setMovies] = useState<TypeMovieFetcher[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const data = await categoriesForId(Number(id), page);
      setMovies(data || []);
      setLoading(false);
    };
    fetchMovies();
  }, [id, page]);

  if (loading) {
    return <SkeletonHme loading={loading} col={true} pages={true} />;
  }

  return (
    <div className="mx-6 relative">
      <h2 className="text-3xl font-bold mb-4"> {name}</h2>
      <section className="grid grid-cols-4 relative h-full p-2 gap-3 border-2 border-indigo-600 rounded-2xl">
        {movies.map((movie) => (
          <article key={movie.id} className="relative md:h-80">
            <div className=" relative">
              <img
                className="rounded-2xl md:h-80 "
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
            {/* <p className="mt-2 text-sm font-semibold">{movie.title}</p> */}
            <FavoriteInfo
              movieId={movie.id}
              openId={openId}
              setOpenId={setOpenId}
            />
          </article>
        ))}
      </section>
      <ButtonPrevAndNext prevPage={prevPage} nextPage={nextPage} />
      <DotsPages totalPages={10} currentPage={page} />
    </div>
  );
};
