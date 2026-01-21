// CategoryMovies.tsx
import { useContext, useEffect } from "react";
import { MoviesContext } from "../Types/TypesMovies";
import { useParams } from "react-router-dom";

export const CategoryMovies = () => {
  const { id } = useParams<{ id: string }>();
  const { categoryId, categoriesForId } = useContext(MoviesContext);

  useEffect(() => {
    if (id) {
      categoriesForId(Number(id));
    }
  }, [id,]);

  if (!categoryId || categoryId.length === 0) {
    return <p className="text-white p-4">No hay películas en esta categoría.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {categoryId.map((movie) => (
        <div key={movie.id} className="bg-black/40 rounded-lg p-2">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className="rounded-md mb-2"
          />
          <h3 className="text-sm text-white">{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};