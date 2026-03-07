import { Link } from "react-router-dom";

export const NotFound = ({title, src, alt, error, showBtn} : {title :string, src :string, alt :string, error?: string, showBtn? : boolean})  => {
  
  return (
    <main className="flex flex-col justify-center items-center space-y-5 text-center w-full h-screen md:h-full">
      <p className="text-lg md:text-xl mt-30 m-0 md:mt-33 text-gray-700">
        {title}
      </p>
      <img
        className="h-1/2 md:h-2/3 md:w-80 m-0 mt-10 object-cover"
        src={src}
        alt={alt}
      />
      <h2 className=" text-5xl md:text-6xl text-red-600 font-bold m-0 mb-14">
        {error}
      </h2>
      {showBtn && (
      <Link
        to="/"
        className="md:text-2xl mb-10 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
      >
        Volver al inicio
      </Link>
      )}
    </main>
  );
};