import React, { useEffect, useState } from "react";
import { API_TOKEN } from "./Secret";
import { MoviesContext, type TypeMovieFetcher } from "./MoviesContext";

export const MovieFetcher = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<TypeMovieFetcher[]>([]);
  const [upComingMovie, setUpComingMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_TOKEN,
    },
  };
  const fetchMovie = async (page: number) => {
    try {
      const resPopulary = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
        options
      );

      if (!resPopulary.ok) {
        throw new Error("Error al traer peticion");
      }

      const dataPopulary = await resPopulary.json();
      setMovies(dataPopulary.results.slice(0, 12));

      const resUpComing = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
        options
      );

      if (!resUpComing.ok) {
        throw new Error("Error al traer peticion");
      }

      const dataUpComing = await resUpComing.json();
      setUpComingMovie(dataUpComing.results);
      console.log("🚀 ~ fetchMovie ~ results:", dataUpComing.results);
    } catch (error) {
      console.log("Error al traer pelicula", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(page);
  }, [page]);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));

  const searchMovies = async (query: string) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1&include_adult=false`,
        options
      );

      if (!res.ok) {
        throw new Error("Error al traer peticion");
      }
      const data = await res.json();
      return data.results;
    } catch (error) {
      console.log("Error al traer pelicula", error);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <MoviesContext.Provider
        value={{
          movies,
          page,
          nextPage,
          prevPage,
          upComingMovie,
          loading,
          searchMovies,
        }}
      >
        {children}
      </MoviesContext.Provider>
    </>
  );
};
