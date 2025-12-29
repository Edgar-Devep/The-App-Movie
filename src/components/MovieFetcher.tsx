import React, { useEffect, useState } from "react";
import { API_TOKEN } from "./Secret";
import { MoviesContext, type TypeMovieFetcher } from "./MoviesContext";

export const MovieFetcher = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<TypeMovieFetcher[]>([]);
  const [upComingMovie, setUpComingMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_TOKEN,
    },
  };
  const fetchMovie = async () => {
    try {
      const resPopulary = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        options
      );

      if (!resPopulary.ok) {
        throw new Error("Error al traer peticion");
      }

      const dataPopulary = await resPopulary.json();
      setMovies(dataPopulary.results.slice(0, 12));

      const resUpComing = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        options
      );

      if (!resUpComing.ok) {
        throw new Error("Error al traer peticion");
      }

      const dataUpComing = await resUpComing.json();
      setUpComingMovie(dataUpComing.results.slice(0, 12));
      console.log("🚀 ~ fetchMovie ~ results:", dataUpComing.results);
    } catch (error) {
      console.log("Error al traer pelicula", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <>
      <MoviesContext.Provider value={{ movies, upComingMovie, loading }}>
        {children}
      </MoviesContext.Provider>
    </>
  );
};
