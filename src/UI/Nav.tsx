import { LuSearch } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ListCategoriesMovies } from "../components/ListCategoriesMovies";

export const Nav = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-white" : "text-indigo-500";
  return (
    <>
      <nav className=" hidden md:flex items-center w-full p-6 bg-black/50 absolute top-0 border-2 border-b-indigo-600 z-3 md:pb-8 text-2xl">
        <ul className="flex justify-center gap-6 lg:gap-12 flex-1 lg:text-3xl">
          <li>
            <NavLink to={"/"} className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/trending"} className={linkClass}>
              Trending
            </NavLink>
          </li>
          <li>
            <NavLink to={"/coming-soon"} className={linkClass}>
              Coming Soon
            </NavLink>
          </li>
        </ul>
        <ul className="flex items-center gap-3 ml-auto">
          <li>
            <NavLink to={"/search"} className={linkClass}>
              <LuSearch title="Buscar" />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/search"} className={linkClass}>
              <FaRegBookmark title="Mi Lista" />
            </NavLink>
          </li>
          <li>
            <ListCategoriesMovies />
          </li>
        </ul>
      </nav>
    </>
  );
};
