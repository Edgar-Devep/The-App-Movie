import { FaHouseChimneyWindow } from "react-icons/fa6";
import { MdYoutubeSearchedFor } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const UITabBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="md:hidden flex items-center justify-around w-full h-10 bg-indigo-400 fixed bottom-0 left-0 border-2 border-t-indigo-600 rounded-t-md">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaHouseChimneyWindow className=" text-md " />
          <span className="text-sm">Home</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer"
        onClick={() => navigate("/search")}
        >
          <MdYoutubeSearchedFor className="text-md" />
          <span className="text-sm">Seach</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <FaRegSave className="text-md" />
          <span className="text-sm">Whatch List</span>
        </div>
      </section>
    </>
  );
};
