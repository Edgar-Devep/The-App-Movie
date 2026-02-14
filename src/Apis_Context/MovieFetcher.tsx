import React, { useState } from "react";
import { API_TOKEN } from "./Secret";
import {
  MoviesContext,
  type TrailerKeyVideo,
  type TypeMovieFetcher,
} from "../Types_Custom/TypesMovies";

export const MovieFetcher = ({ children }: { children: React.ReactNode }) => {
  const [categoryId, setCategoryId] = useState<TypeMovieFetcher[]>([]);
  const [trailerKey, setTrailerKey] = useState<TrailerKeyVideo[]>([]);

  // Configuracion de Peticion de Api The Movie Database
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_TOKEN,
    },
  };

  // funcion para obtener las peliculas mejor valoradas (top_rated) de Api The Movie Database
  const posterPrincipalTop = async (page: number) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
        options,
      );

      if (!res.ok) {
        throw new Error("Error al traer peticion");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error al traer pelicula", error);
    }
  };

  // funcion para obtener peliculas en tendencias(trending) de Api The Movie Database
  const trendingMovieHome = async (page: number) => {
    try {
      const resTrending = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`,
        options,
      );

      if (!resTrending.ok) {
        throw new Error("Error al traer peticion");
      }

      const dataTrending = await resTrending.json();
      return dataTrending.results;
    } catch (error) {
      console.log("Error al traer pelicula", error);
    }
  };

  // funcion para obtener peliculas proximas en estrenar (upcoming) de Api The Movie Database
  const unCominggMovie = async (page: number) => {
    try {
      const resUpComing = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
        options,
      );

      if (!resUpComing.ok) {
        throw new Error("Error al traer peticion");
      }

      const dataUpComing = await resUpComing.json();
      return dataUpComing.results;
    } catch (error) {
      console.log("Error al traer pelicula", error);
    }
  };

  // funcion que obtiener las peliculas populares de Api The Movie Database
  const popular = async (page: number) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
        options,
      );

      if (!res.ok) {
        throw new Error("Error al traer peticion");
      }

      const data = await res.json();
      return data.results;
    } catch (error) {
      console.log("Error al traer pelicula", error);
    }
  };

  // funcion ue busca películas por texto (query) de Api The Movie Database
  const searchMovies = async (query: string) => {
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
    }
  };

  // funcion que obtiener la lista de géneros de películas de Api The Movie Database
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

  // funcion que obtiener películas filtradas por género (id) de Api The Movie Database
  const categoriesForId = async (id: number, page: number) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${id}`,
        options,
      );
      if (!res.ok) {
        throw new Error("Error al traer peticion");
      }
      const data = await res.json();
      setCategoryId(data.results);
      return data.results;
    } catch (error) {
      console.log("Error al traer Categorias", error);
      return [];
    }
  };

  // funcion que obtiener trailer películas
  const trailerMovie = async (id: number) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        options,
      );
      if (!res.ok) {
        throw new Error("Error al traer peticion");
      }
      const data = await res.json();
      console.log(" data.results:", data.results);
      setTrailerKey(data.results);
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
          categoryId,
          trailerKey,
          trendingMovieHome,
          unCominggMovie,
          popular,
          searchMovies,
          posterPrincipalTop,
          categoriesHome,
          categoriesForId,
          trailerMovie,
        }}
      >
        {children}
      </MoviesContext.Provider>
    </>
  );
};
