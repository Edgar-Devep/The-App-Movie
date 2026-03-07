import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { RiSearch2Line, RiSearch2Fill } from "react-icons/ri";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ListCategoriesMovies } from "../components/ListCategoriesMovies";
import { useCustomNavigate } from "../Types_Custom/CustomHooks";

export const UITabBar = () => {
  
  const { categoryActive, setCategoryActive, linkClass } = useCustomNavigate();
  
  return (
    <>
      <section className="section_taBar">
        <div className="div_tabBar" onClick={() => setCategoryActive(false)}>
          <NavLink to={"/"} className={linkClass} title="Home">
            {({ isActive }) =>
              isActive && !categoryActive ? <IoHomeSharp /> : <IoHomeOutline />
            }
          </NavLink>
        </div>

        <div className="div_tabBar" onClick={() => setCategoryActive(false)}>
          <NavLink to={"/search"} className={linkClass} title="Search">
            {({ isActive }) =>
              isActive && !categoryActive ? (
                <RiSearch2Fill />
              ) : (
                <RiSearch2Line />
              )
            }
          </NavLink>
        </div>

        <div className="div_tabBar" onClick={() => setCategoryActive(false)}>
          <NavLink to={"/my_list"} className={linkClass} title="Whatch List">
            {({ isActive }) =>
              isActive && !categoryActive ? <FaBookmark /> : <FaRegBookmark />
            }
          </NavLink>
        </div>
        <div className="div_tabBar" onClick={() => setCategoryActive(true)}>
          <ListCategoriesMovies showCategories={true} />
        </div>
      </section>
    </>
  );
};
