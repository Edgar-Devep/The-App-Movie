import { useContext, useEffect, useState } from "react";
import { MoviesContext, type TypeMovieFetcher } from "../Types_Custom/TypesMovies";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const ListCategoriesMovies = ({ showCategories }: { showCategories: boolean }) => {

  const [categoryList, setCategoryList] = useState<TypeMovieFetcher[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { categoriesHome } = useContext(MoviesContext);

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await categoriesHome();
      setCategoryList(result);
    };
    fetchCategory();
  }, [categoriesHome]);

  return (
    <>
      <div className="relative inline-block text-left">
        <button
          className={`flex items-center gap-2 ${showCategories ? "" : "pt-2"}`}
          title="Categories"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <FaTimes
              className="text-white"
            />
          ) : (
            <FaBars
              className="text-blue-500"
            />
          )}
        </button>

        {open && (
          <>
            <div
              className={`fixed ${showCategories ? "left-0 right-0 top-0 bottom-14" : "left-0 right-0 top-18 bottom-0"}`}
              onClick={() => setOpen(false)}
            />
            <div
              className={`absolute w-fit bg-blue-500/70 rounded-md right-0 overflow-y-auto ${showCategories ? "bottom-full mb-4 max-h-100 " : "mt-2 max-h-148"} `}
            >
              {categoryList.map((category) => (
                <div
                  key={category.id}
                  onClick={() => {
                    setOpen(false);
                    navigate(`/categories/${category.name}/${category.id}/`);
                  }}
                  className="text-md px-4 py-2 cursor-pointer hover:bg-blue-400"
                >
                  {category.name}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
