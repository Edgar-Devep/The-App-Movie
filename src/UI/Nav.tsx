import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ListCategoriesMovies } from "../components/ListCategoriesMovies";
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri";
import { useCustomNavigate } from "../Types_Custom/CustomHooks";

export const Nav = () => {

  const { categoryActive, setCategoryActive, linkClass } = useCustomNavigate();
  
  return (
    <>
      <nav className=" hidden absolute md:flex items-center w-full pl-22 p-6 bg-black/50 top-0 border-2 border-b-blue-600 z-3 md:pb-8 text-2xl">
        <ul className="flex justify-center gap-6 lg:gap-12 flex-1 lg:text-3xl">
          <li>
            <NavLink to={"/"} className={linkClass} title="Home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/trending"} className={linkClass} title="Trending">
              Trending
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/coming-soon"}
              className={linkClass}
              title="Coming Soon"
            >
              Coming Soon
            </NavLink>
          </li>
          <li>
            <NavLink to={"/popular"} className={linkClass} title="Popular">
              Popular
            </NavLink>
          </li>
        </ul>
        <ul className="flex items-center gap-4">
          <li onClick={() => setCategoryActive(false)}>
            <NavLink to={"/search"} className={linkClass}>
              {({ isActive }) =>
                isActive && !categoryActive ? (
                  <RiSearch2Fill />
                ) : (
                  <RiSearch2Line />
                )
              }
            </NavLink>
          </li>
          <li onClick={() => setCategoryActive(false)}>
            <NavLink to={"/my_list"} className={linkClass}>
              {({ isActive }) =>
                isActive && !categoryActive ? <FaBookmark /> : <FaRegBookmark />
              }
            </NavLink>
          </li>
          <li onClick={() => setCategoryActive(true)}>
            <ListCategoriesMovies showCategories={false} />
          </li>
        </ul>
      </nav>
    </>
  );
};
