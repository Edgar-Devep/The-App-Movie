import { MdFavoriteBorder } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import type { ButtonAndMenuFavorite } from "../Types/TypesMovies";

export const ButtonMenu = ({
  movieId,
  openId,
  setOpenId,
}: ButtonAndMenuFavorite) => {
  return (
    <>
      <button
        className="absolute top-2 right-2 bg-black/50 rounded-full cursor-pointer"
        onClick={() => setOpenId(openId === movieId ? null : movieId)}
      >
        <CiMenuKebab className="text-white" />
      </button>
    </>
  );
};

export const FavoriteInfo = ({
  movieId,
  openId,
  setOpenId,
}: ButtonAndMenuFavorite) => {
  return (
    <>
      {openId === movieId && (
        <div className="flex flex-col absolute top-7 right-1 bg-black/80 shadow-lg rounded-md p-2 w-12 z-10 ">
          <button
            onClick={() => setOpenId(null)}
            className="flex items-center px-2 py-1 hover:bg-red-200 rounded cursor-pointer"
            title="Favoritos"
          >
            <MdFavoriteBorder className="text-red-700" />
          </button>
          <button
            onClick={() => setOpenId(null)}
            className="flex items-center px-2 py-1 hover:bg-yellow-200 rounded cursor-pointer"
            title="Información"
          >
            <IoMdInformationCircleOutline className="text-yellow-700" />
          </button>
        </div>
      )}
    </>
  );
};
