import { Link } from "react-router-dom";

export const LogoMovie = ({ overlay = false }: { overlay?: boolean }) => {
  return (
    <div
      className={
        overlay
          ? "absolute top-0 flex justify-center items-center md:items-start md:flex-col drop-shadow-[3px_7px_6px_#fff]"
          : "flex justify-center items-center md:items-start md:flex-col drop-shadow-[3px_7px_6px_#fff]"
      }
    >
      <Link to={"/"} className="pl-3 pt-1 inline-flex items-center gap-2">
        <p className="text-indigo-500 text-base font-bold md:text-5xl md:pl-3 md:pt-2">
          The Movie
        </p>
        <img
          className="bg-transparent w-10 h-auto md:w-34"
          src="/logo_movie.png"
          alt="Logo de Peliculas"
        />
      </Link>
    </div>
  );
};
