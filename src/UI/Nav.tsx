import { LuSearch } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { ListCategoriesMovies } from "../components/ListCategoriesMovies";

export const Nav = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-white" : "text-indigo-500";
  return (
    <>
      <nav className=" hidden md:flex items-center w-full py-4 bg-black/50 absolute top-0 border-2 border-b-indigo-600 z-3 px-4 text-2xl">
        <ul className="flex justify-center gap-3 flex-1 ">
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
            <ListCategoriesMovies />
          </li>
        </ul>
      </nav>
      );
    </>
  );
};
