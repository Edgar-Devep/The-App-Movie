import { Link } from "react-router-dom";

export const LogoMovie = () => {
  return (
    <div
      className={"absolute top-3 md:static z-5 flex justify-center items-center drop-shadow-[3px_7px_6px_#fff]"
      }
    >
      <Link
        to={"/"}
        className="pl-3 pt-1 inline-flex items-center gap-2 md:gap-0 md:items-center md:flex-col"
      >
        <p className="text-blue-500 text-2xl font-bold md:text-xl">
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
