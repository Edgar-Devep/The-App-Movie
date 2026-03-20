import { useState, useEffect, useContext } from "react";
import { likedMoviesList } from "../components/Like_Movies";
import { MoviesContext, type TypeMovieFetcher,} from "../Types_Custom/TypesMovies";
import { NotFound } from "../UI/NotFound";
import { ButtonMenu, FavoriteInfo } from "../UI/Menu_Favorite_Info";
import { MovieModal } from "../UI/MovieModal";
import { LogoMovie } from "../UI/LogoMovie";

const getMoviesArray = (): TypeMovieFetcher[] => {
  const moviesObj = likedMoviesList();
  return Object.values(moviesObj).filter(Boolean) as TypeMovieFetcher[];
};

export const My_List_Like_Movie = () => {
  const [likedMovies, setLikedMovies] = useState<TypeMovieFetcher[]>(getMoviesArray);
  const [selectedMovie, setSelectedMovie] = useState<TypeMovieFetcher | null>( null,);
  const [openId, setOpenId] = useState<number | string | null>(null);

  const { trailerMovie, trailerKey } = useContext(MoviesContext);

  useEffect(() => {
    const handleStorage = () => {
      setLikedMovies(getMoviesArray());
    };
    document.documentElement.scrollTop = 0;
    
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleMovieSelect = async (movie: TypeMovieFetcher) => {
    setSelectedMovie(movie);
    await trailerMovie(movie.id);
  };
  return (
    <>
      {likedMovies.length === 0 ? (
        <NotFound
          title="No tienes películas en favoritos aún"
          src="/logo_movie.png"
          alt="Sin Favoritos"
          showBtn={true}
        />
      ) : (
        <>
          <div className="flex justify-center md:hidden">
            <LogoMovie />
          </div>
          <h1 className="title_componentes mt-20 md:mt-44 mb-10" title="Favoritos">
            Mis Favoritos
          </h1>
          <div className="relative mx-6 ">
            <div className="relative w-full p-1 gap-2 md:gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {likedMovies.map((movie) => (
                <div key={movie.id} className="relative w-full">
                  <img
                    className={`rounded-lg w-full h-64 md:h-72 lg:h-96`}
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/no_disponible.png"
                    }
                    alt={movie.title}
                  />
                  <ButtonMenu
                    movieId={movie.id}
                    openId={openId}
                    setOpenId={setOpenId}
                  />
                  <FavoriteInfo
                    movieId={movie.id}
                    openId={openId}
                    setOpenId={setOpenId}
                    onInfoClick={() => handleMovieSelect(movie)}
                  />
                </div>
              ))}
            </div>
          </div>
          {selectedMovie && (
            <MovieModal
              movie={selectedMovie}
              isOpen={!!selectedMovie}
              onClose={() => setSelectedMovie(null)}
              trailerKey={trailerKey}
              onPlayTrailer={() => trailerMovie(selectedMovie.id)}
            />
          )}
        </>
      )}
    </>
  );
};
