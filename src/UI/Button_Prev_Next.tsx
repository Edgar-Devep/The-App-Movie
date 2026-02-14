import { GrNext, GrPrevious } from "react-icons/gr";
import type { ButtonPrevAndNextProps } from "../Types_Custom/TypesMovies";

export const ButtonPrevAndNext = ({
  prevPage,
  nextPage,
  disabledPrev,
}: ButtonPrevAndNextProps) => {
  return (
    <>
      {!disabledPrev && (
        <button
          onClick={prevPage}
          className="md:w-8 md:h-8 md:text-2xl z-50 flex justify-center items-center absolute bg-transparent left-3 top-1/2 rounded-full text-white border-2 font-extrabold transition-transform duration-500 
             hover:scale-125 hover:bg-indigo-500/70 cursor-pointer"
        >
          <GrPrevious />
        </button>
      )}
      <button
        onClick={nextPage}
        className="md:w-8 md:h-8 md:text-2xl z-50 flex justify-center items-center absolute bg-transparent right-3 top-1/2 rounded-full text-white border-2 font-extrabold transition-transform duration-500 
             hover:scale-125 hover:bg-indigo-500/70 cursor-pointer"
      >
        <GrNext />
      </button>
    </>
  );
};
