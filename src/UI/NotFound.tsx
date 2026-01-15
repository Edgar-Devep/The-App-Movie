import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <main className=" relative flex flex-col justify-center items-center text-center w-full h-screen p-8">
      <h2 className="absolute top-36 md:top-60 md:text-8xl text-5xl text-red-600 font-bold ">Error 404</h2>
      <p className="absolute top-20 md:top-40 md:text-2xl mt-2 text-gray-700">La página que buscas no existe.</p>
      <img
        className=" h-auto w-64 md:w-2xl"
        src="/error_404.png"
        alt="Ilustración de error 404"
      />
      <Link
        to="/"
        className="md:text-2xl mt-6 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
      >
        Volver al inicio
      </Link>
    </main>
  );
};
