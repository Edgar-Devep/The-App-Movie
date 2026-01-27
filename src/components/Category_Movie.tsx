import { useContext, useEffect, useState } from "react";
import {
  MoviesContext,
  type CategoryWithMovies,
  type TypeMovieFetcher,
} from "../Types/TypesMovies";
import { Link } from "react-router-dom";
import { ButtonMenu, FavoriteInfo } from "../UI/Menu_Favorite_Info";
import { SkeletonHme } from "../UI/Loading";

export const CategoryMovies = () => {
  const { categoriesHome, categoriesForId } = useContext(MoviesContext);

  const [openId, setOpenId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoriesWithMovies, setCategoriesWithMovies] = useState<
    CategoryWithMovies[]
  >([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);

      const categories = await categoriesHome();

      if (!categories) {
        setLoading(false);
        return;
      }

      const categoriesData = await Promise.all(
        categories.map(async (category: TypeMovieFetcher) => {
          const movies = await categoriesForId(category.id, 1);
          return {
            id: category.id,
            name: category.name,
            movies: movies || [],
          };
        }),
      );

      setCategoriesWithMovies(categoriesData);
      setLoading(false);
    };

    fetchAllCategories();
  }, []);

  if (loading) {
    return <SkeletonHme loading={loading} col={true} pages={false} />;
  }

  return (
    <div>
      {categoriesWithMovies.map((category) => (
        <div key={category.id}>
          <Link to={`/categories/${category.name}/${category.id}`}>
            <h2 className="inline-flex ml-6 mb-4 mt-6 text-2xl font-bold drop-shadow-[3px_7px_6px_#4E38F3] md:text-3xl hover:text-indigo-500 hover:drop-shadow-[3px_7px_6px_#FFF]">
              {category.name}
            </h2>
          </Link>

          <div className="mx-6 relative">
            <section className="h-full relative p-2 flex flex-row gap-3 border-2 border-indigo-600 rounded-2xl overflow-x-auto">
              {category.movies.map((movie: TypeMovieFetcher) => (
                <article key={movie.id} className="md:h-80 shrink-0 relative">
                  <div className="relative">
                    <img
                      className="h-32 md:h-80 rounded-2xl"
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
          </div>
        </div>
      ))}
    </div>
  );
};
