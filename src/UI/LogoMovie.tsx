import { Link } from "react-router-dom";

export const LogoMovie = ({ overlay = false }: { overlay?: boolean }) => {
  return (
    <div
      className={
        overlay
          ? "absolute top-0 z-5 flex justify-center items-center drop-shadow-[3px_7px_6px_#fff]"
          : "relative flex justify-start items-center z-4 drop-shadow-[3px_7px_6px_#fff] pointer-events-none"
      }
    >
      <Link
        to={"/"}
        className="pl-3 pt-1 inline-flex items-center gap-2 md:gap-0 pointer-events-auto md:items-center md:flex-col"
      >
        <p className="text-indigo-500 text-base font-bold md:text-xl">
          The Movie
        </p>
        <img
          className="bg-transparent w-10 h-auto md:w-12"
          src="/logo_movie.png"
          alt="Logo de Peliculas"
        />
      </Link>
    </div>
  );
};
