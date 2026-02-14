import { FaHouseChimneyWindow } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const UITabBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="section-taBar">
        <div
          className="div-tabBar"
          onClick={() => navigate("/")}
        >
          <FaHouseChimneyWindow className=" text-md " />
          <span className="text-sm">Home</span>
        </div>
        <div className="div-tabBar"
        onClick={() => navigate("/search")}
        >
          <LuSearch className="text-md" />
          <span className="text-sm">Seach</span>
        </div>
        <div className="div-tabBar">
          <FaRegBookmark className="text-md" />
          <span className="text-sm">Whatch List</span>
        </div>
      </section>
    </>
  );
};
