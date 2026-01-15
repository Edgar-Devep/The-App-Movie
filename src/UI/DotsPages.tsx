import type { DotsPaginaProps } from "../Types/TypesMovies";

export const DotsPages = ({ totalPages, currentPage }: DotsPaginaProps) => (
  <div className="flex justify-center mt-4 mx-8 space-x-3 md:space-x-5">
    {Array.from({ length: totalPages }).map((_, index) => (
      <div
        key={index}
        className={`w-2 h-2 md:w-4 md:h-4 transition-all rounded-full duration-300
          ${
            (currentPage - 1) % totalPages === index
              ? "bg-indigo-500 scale-150"
              : "bg-indigo-300"
          }`}
      ></div>
    ))}
  </div>
);
