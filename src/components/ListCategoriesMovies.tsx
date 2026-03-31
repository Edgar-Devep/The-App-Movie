import { useContext, useEffect, useState } from "react";
import { MoviesContext, type TypeMovieFetcher } from "../Types_Custom/TypesMovies";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useKeyDown, useScroll } from "../Types_Custom/CustomHooks";

export const ListCategoriesMovies = ({ showCategories }: { showCategories: boolean }) => {

  const [categoryList, setCategoryList] = useState<TypeMovieFetcher[]>([]);
  const navigate = useNavigate();

  const { categoriesHome, openMenuCategories, setOpenMenuCategories } = useContext(MoviesContext);

  useScroll(openMenuCategories);
  useKeyDown(openMenuCategories, () => setOpenMenuCategories(false));

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await categoriesHome();
      setCategoryList(result);
    };
    fetchCategory();
  }, [categoriesHome]);

  const handleOpenMenu = () => {
    setOpenMenuCategories(!openMenuCategories)
    document.documentElement.scrollTop = 0; 
  }

  return (
    <>
      <div className="relative inline-block text-left">
        <button
          className={`flex items-center gap-2 cursor-pointer ${showCategories ? "" : "pt-2"}`}
          title="Categories"
          onClick={handleOpenMenu}
        >
          {openMenuCategories ? (
            <FaTimes
              className="text-white relative z-50"
            />
          ) : (
            <FaBars
              className="text-blue-500"
            />
          )}
        </button>

        {openMenuCategories && (
          <>
            <div
              className={"fixed inset-0 bg-black/70 z-40 cursor-default backdrop-blur-xs"}
              onClick={() => setOpenMenuCategories(false)}
            />
            <div
              className={`absolute z-50 w-fit bg-blue-500/70 rounded-md right-0 overflow-y-auto ${showCategories ? "bottom-full mb-4 max-h-100 " : "mt-2 max-h-148"} `}
            >
              {categoryList.map((category) => (
                <div
                  key={category.id}
                  onClick={() => {
                    setOpenMenuCategories(false);
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
