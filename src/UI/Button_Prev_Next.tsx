import { GrNext, GrPrevious } from "react-icons/gr";
import type { ButtonPrevAndNextProps } from "../Types_Custom/TypesMovies";

export const ButtonPrevAndNext = ({ prevPage, nextPage, disabledPrev }: ButtonPrevAndNextProps) => {

  return (
    <>
      {!disabledPrev && (
        <button
          onClick={prevPage}
          className="left-6 btns_prev_next"
        >
          <GrPrevious />
        </button>
      )}
      <button
        onClick={nextPage}
        className="right-6 btns_prev_next"
      >
        <GrNext />
      </button>
    </>
  );
};
