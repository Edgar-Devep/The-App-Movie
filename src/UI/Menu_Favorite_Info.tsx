import { IoMdInformationCircleOutline } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import type { ButtonAndMenuFavorite, FavoriteInfoProps } from "../Types_Custom/TypesMovies";

export const ButtonMenu = ({ movieId, openId, setOpenId }: ButtonAndMenuFavorite) => {

  return (
    <button
      className="absolute top-2 right-2 bg-black/50 rounded-full cursor-pointer hover:bg-black/70 transition-colors p-1"
      onClick={() => setOpenId(openId === movieId ? null : movieId)} title="Menu"
    >
      <CiMenuKebab className="text-white md:text-lg" />
    </button>
  );
};

export const FavoriteInfo = ({ movieId, openId, setOpenId, onInfoClick }: FavoriteInfoProps) => {
  
  return (
    <>
      {openId === movieId && (
        <>
        <div className="fixed inset-0 z-20"
        onClick={() => setOpenId(null)}
        />

        <div className="flex flex-col absolute z-20 top-8 md:top-8 right-1 bg-black/80 shadow-lg rounded-md w-8 md:w-10"
        >
          <button
            onClick={() => {
              onInfoClick();
              setOpenId(null);
            }}
            className=" flex justify-center py-2 hover:bg-yellow-200 rounded cursor-pointer"
            title="Info."
          >
            <IoMdInformationCircleOutline className="text-yellow-700 md:text-2xl" />
          </button>
        </div>
        </>
      )}
    </>
  );
};
