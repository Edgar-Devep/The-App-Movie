import React, { useContext, useEffect, useState } from "react";
import {
  MoviesContext,
  type TypeMovieFetcher,
} from "../Types_Custom/TypesMovies";
import { useNavigate } from "react-router-dom";

export const ListCategoriesMovies = () => {
  const [categoryList, setCategoryList] = useState<TypeMovieFetcher[]>([]);
  const navigate = useNavigate();

  const { categoriesHome } = useContext(MoviesContext);

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await categoriesHome();
      setCategoryList(result);
    };
    fetchCategory();
  }, [categoriesHome]);

  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = Number(event.target.value);
    const category = categoryList.find((categ) => categ.id === categoryId);

    if (category) {
      navigate(`/categories/${category.name}/${category.id}`);
    }
  };

  return (
    <>
      <select
        onChange={handleCategory}
        className="w-22 h-8 text-sm bg-indigo-400/70 rounded-2xl outline-none"
      >
        <option value="" className="text-sm">
          Categories
        </option>
        {categoryList.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
};
