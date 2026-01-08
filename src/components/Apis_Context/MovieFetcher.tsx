import React, { useEffect, useState } from "react";
import { API_TOKEN } from "./Secret";
import { MoviesContext, type TypeMovieFetcher } from "../Types/TypesMovies";

export const MovieFetcher = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<TypeMovieFetcher[]>([]);
  const [upComingMovie, setUpComingMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [pageUpComing, setPageUpComing] = useState(1);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_TOKEN,
    },
  };
  const fetchMovie = async (page: number, pageUpComing: number) => {
    setLoading(true);
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
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pageUpComing}`,
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
    fetchMovie(page, pageUpComing);
  }, [page, pageUpComing]);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));

  const prevPageUpComing = () =>
    setPageUpComing((prev) => (prev > 1 ? prev - 1 : prev));
  const nextPageUpComing = () => setPageUpComing((prev) => prev + 1);

  const searchMovies = async (query: string) => {
    setLoading(true);
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
          upComingMovie,
          searchMovies,
          page,
          setPage,
          pageUpComing,
          setPageUpComing,
          nextPage,
          prevPage,
          prevPageUpComing,
          nextPageUpComing,
          loading,
        }}
      >
        {children}
      </MoviesContext.Provider>
    </>
  );
};
