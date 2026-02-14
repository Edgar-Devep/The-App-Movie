import { IoClose } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaStar, FaCalendar, FaClock, FaVideo } from "react-icons/fa";
import type { MovieModalProps } from "../Types_Custom/TypesMovies";
import { useKeyDown, useScroll } from "../Types_Custom/CustomHooks";
import { useState } from "react";

export const MovieModal = ({
  movie,
  isOpen,
  onClose,
  trailerKey,
  onPlayTrailer,
}: MovieModalProps) => {
  const [showTrailer, setShowTrailer] = useState(false);

  useScroll(isOpen);
  useKeyDown(isOpen, onClose);

  if (!isOpen) return null;

  const officialTrailer = trailerKey?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  const handlePlayTrailer = () => {
    if (onPlayTrailer) {
      onPlayTrailer();
    }
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  const handleClose = () => {
    setShowTrailer(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-linear-to-b from-secondary via-primary-slow-800 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {!showTrailer && (
          <button
            onClick={handleClose}
            className="btns-close-inf-trailer-modal"
            title="Cerrar"
          >
            <IoClose className="btns-icon-close-modal" />
          </button>
        )}

        {showTrailer && officialTrailer ? (
          <div className="relative">
            <button
              onClick={handleCloseTrailer}
              className="btns-close-inf-trailer-modal"
              title="Cerrar trailer"
            >
              <IoClose className="btns-icon-close-modal" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${officialTrailer.key}?autoplay=1`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-t-2xl"
              />
            </div>
          </div>
        ) : (
          <div className="relative h-64 md:h-96 overflow-hidden rounded-t-2xl">
            <img
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`
                  : "/no_disponible.png"
              }
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/50 to-transparent" />

            {officialTrailer && (
              <button
                onClick={handlePlayTrailer}
                className="absolute inset-0 flex items-center justify-center group"
                title="Ver trailer"
              >
                <div className="bg-black/60 group-hover:bg-black/80 rounded-full p-6 transition-all transform group-hover:scale-110">
                  <FaVideo className="text-white text-4xl md:text-6xl" />
                </div>
              </button>
            )}
          </div>
        )}

        <div className="relative px-6 md:px-10 py-8 -mt-20">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/no_disponible.png"
                }
                alt={movie.title}
                className={
                  showTrailer
                    ? "hidden"
                    : "w-40 md:w-48 rounded-xl shadow-2xl border-2 border-indigo-500/90 "
                }
              />
            </div>

            <div className="flex-1 text-white">
              <h2
                className={
                  showTrailer
                    ? "title-modal pt-8 md:pt-12"
                    : "title-modal"
                }
              >
                {movie.title}
              </h2>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full">
                  <FaStar className="text-yellow-500" />
                  <span className="font-semibold">
                    {movie.vote_average?.toFixed(1)}
                  </span>
                </div>

                {movie.release_date && (
                  <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full">
                    <FaCalendar className="text-blue-400" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                  <FaClock className="text-green-400" />
                  <span>{movie.vote_count} votes</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Sinopsis</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movie.overview || "No hay descripción disponible."}
                </p>
              </div>

              <div className="flex space-x-5">
                <button
                  className="btns-add-video-modal"
                  title="Agregar a favoritos"
                >
                  <IoIosAddCircleOutline className="text-xl" />
                </button>
                {officialTrailer && (
                  <button
                    className="btns-add-video-modal"
                    onClick={handlePlayTrailer}
                    title="Ver trailer"
                  >
                    <FaVideo className="text-xl" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
