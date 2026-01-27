import { GrNext, GrPrevious } from "react-icons/gr";

export const ButtonPrevAndNext = ({
  prevPage,
  nextPage,
}: {
  prevPage: React.MouseEventHandler<HTMLButtonElement>;
  nextPage: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <>
      <button
        onClick={prevPage}
        className="md:w-8 md:h-8 md:text-2xl flex justify-center items-center absolute bg-transparent left-3 top-56 rounded-full text-white border-2 font-extrabold transition-transform duration-500 
             hover:scale-125 hover:bg-indigo-500/70 cursor-pointer"
      >
        <GrPrevious />
      </button>
      <button
        onClick={nextPage}
        className="md:w-8 md:h-8 md:text-2xl flex justify-center items-center absolute bg-transparent right-3 top-56 rounded-full text-white border-2 font-extrabold transition-transform duration-500 
             hover:scale-125 hover:bg-indigo-500/70 cursor-pointer"
      >
        <GrNext />
      </button>
    </>
  );
};
