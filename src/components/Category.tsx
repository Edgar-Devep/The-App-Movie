import { useContext, useEffect, useState } from "react";
import {
  MoviesContext,
  type CategoryWithMovies,
  type TypeMovieFetcher,
} from "../Types_Custom/TypesMovies";
import { Link } from "react-router-dom";
import { ButtonMenu, FavoriteInfo } from "../UI/Menu_Favorite_Info";
import { SkeletonHome } from "../UI/Loading";
import { MovieModal } from "../UI/MovieModal";

export const CategoryMovies = () => {
  const { categoriesHome, categoriesForId, trailerKey, trailerMovie } =
    useContext(MoviesContext);

  const [openId, setOpenId] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<TypeMovieFetcher | null>(
    null,
  );
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

  const handleMovieSelect = async (movie: TypeMovieFetcher) => {
    setSelectedMovie(movie);
    await trailerMovie(movie.id);
  };

  return (
    <div>
      {loading ? (
        <>
          <div className="title-componentes">Action</div>
          <SkeletonHome loading={loading} col={true} pages={false} />
        </>
      ) : (
        <>
          {categoriesWithMovies.map((category) => {
            return (
              <div key={category.id}>
                <Link to={`/categories/${category.name}/${category.id}`}>
                  <h2 className="title-componentes">{category.name}</h2>
                </Link>

                <div className="mx-6 relative">
                  <section className="h-full relative p-1 flex flex-row gap-2 border-2 border-indigo-600 rounded-2xl overflow-x-auto">
                    {category.movies.map((movie: TypeMovieFetcher) => {
                      return (
                        <article key={movie.id} className="shrink-0 relative">
                          <div className="relative w-full">
                            <img
                              className=" w-full h-44 md:h-72 rounded-lg"
                              src={
                                movie.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                  : "/no_disponible.png"
                              }
                              alt={movie.title || "Poster no disponible"}
                              title={movie.title}
                            />
                            <ButtonMenu
                              movieId={`${category.id}-${movie.id}`}
                              openId={openId}
                              setOpenId={setOpenId}
                            />
                          </div>
                          <FavoriteInfo
                            movieId={`${category.id}-${movie.id}`}
                            openId={openId}
                            setOpenId={setOpenId}
                            onInfoClick={() => handleMovieSelect(movie)}
                          />
                        </article>
                      );
                    })}
                  </section>
                </div>
              </div>
            );
          })}
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
          trailerKey={trailerKey}
          onPlayTrailer={() => trailerMovie(selectedMovie.id)}
        />
      )}
    </div>
  );
};
