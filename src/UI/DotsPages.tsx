import type { DotsPaginaProps } from "../Types/TypesMovies";

export const DotsPages = ({ totalPages, currentPage }: DotsPaginaProps) => (
  <div className="w-full h-full flex justify-center items-center mt-4 md:space-x-5">
    {Array.from({ length: totalPages }).map((_, index) => {
      const isActive = (currentPage - 1) % totalPages === index;
      return (
        <div
          key={index}
          className={`flex justify-center items-center mx-1 md:w-4 md:h-4 transition-all duration-300 text-white text-balance rounded-full
          ${isActive ? "w-4 h-auto bg-indigo-500 scale-100" : "w-2 h-2 bg-indigo-300"}`}
        >
          {isActive ? currentPage : null}
        </div>
      );
    })}
  </div>
);
