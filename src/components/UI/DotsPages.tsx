import type { DotsPaginaProps } from "../Types/TypesMovies";

export const DotsPages = ({ totalPages, currentPage }: DotsPaginaProps) => (
  <div className="flex justify-center mt-4 mx-8 space-x-3">
    {Array.from({ length: totalPages }).map((_, index) => (
      <div
        key={index}
        className={`w-3 h-3 transition-all rounded-full duration-300
          ${
            (currentPage - 1) % totalPages === index
              ? "bg-indigo-500 scale-150"
              : "bg-indigo-300"
          }`}
      ></div>
    ))}
  </div>
);
