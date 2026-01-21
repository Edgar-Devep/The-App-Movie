import React, { useEffect, useState } from "react";
import { API_TOKEN } from "./Secret";
import { MoviesContext, type TypeMovieFetcher } from "../Types/TypesMovies";

export const MovieFetcher = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<TypeMovieFetcher[]>([]);
  const [upComingMovie, setUpComingMovie] = useState<TypeMovieFetcher[]>([]);
  const [categoryId, setCategoryId] = useState<TypeMovieFetcher[]>([]);
  const [page, setPage] = useState(1);
  const [pageUpComing, setPageUpComing] = useState(1);
  const [loading, setLoading] = useState(true);

  // Configuracion de Peticion de Api The Movie Database
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_TOKEN,
    },
  };

  // funcion para obtener las peliculas mejor valoradas (top_rated) de Api The Movie Database
  const PosterPrincipalTop = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        options,
      );

      if (!res.ok) {
        throw new Error("Error al traer peticion");
      }

      const data = await res.json();
      return data.results;
    } catch (error) {
      console.log("Error al traer pelicula", error);
    } finally {
      setLoading(false);
    }
  };

  // funcion para obtener peliculas en tendencias y proximas en estrenar (trending y upcoming) de Api The Movie Database
  const fetchMovie = async (page: number, pageUpComing: number) => {
    setLoading(true);
    try {
      const resTrending = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`,
        options,
      );

      if (!resTrending.ok) {
        throw new Error("Error al traer peticion");
      }

      const dataTrending = await resTrending.json();
      setMovies(dataTrending.results);

      const resUpComing = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pageUpComing}`,
        options,
      );

      if (!resUpComing.ok) {
        throw new Error("Error al traer peticion");
      }

      const dataUpComing = await resUpComing.json();
      setUpComingMovie(dataUpComing.results);
    } catch (error) {
      console.log("Error al traer pelicula", error);
    } finally {
      setLoading(false);
    }
  };

  // Se llama a fetchMovie al montar el componente y cambiar la pagina
  useEffect(() => {
    fetchMovie(page, pageUpComing);
  }, [page, pageUpComing]);

  // Funciones de paginación para trending y upcoming
  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));

  const prevPageUpComing = () =>
    setPageUpComing((prev) => (prev > 1 ? prev - 1 : prev));
  const nextPageUpComing = () => setPageUpComing((prev) => prev + 1);

  // funcion ue busca películas por texto (query) de Api The Movie Database
  const searchMovies = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1&include_adult=false`,
        options,
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

  // funcion que obtiene la lista de géneros de películas de Api The Movie Database
  const categoriesHome = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options,
      );

      if (!res.ok) {
        throw new Error("Error al traer peticion");
      }

      const data = await res.json();
      return data.genres;
    } catch (error) {
      console.log("Error al traer pelicula", error);
    }
  };

  // funcion que obtiene películas filtradas por género (id) de Api The Movie Database
  const categoriesForId = async (id: number) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`,
        options,
      );
      if (!res.ok) {
        throw new Error("Error al traer peticion");
      }
      const data = await res.json();
      console.log("🚀 ~ categoriesForId ~ data:", data);
      setCategoryId(data.results);
      return data.results;
    } catch (error) {
      console.log("Error al traer Categorias", error);
      return [];
    }
  };

  return (
    <>
      <MoviesContext.Provider
        value={{
          movies,
          upComingMovie,
          categoryId,
          searchMovies,
          PosterPrincipalTop,
          categoriesHome,
          categoriesForId,
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

//`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options