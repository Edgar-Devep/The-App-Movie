import React, { useCallback, useState } from "react";
import { API_TOKEN } from "./Secret";
import { MoviesContext, type TrailerKeyVideo, type TypeMovieFetcher } from "../Types_Custom/TypesMovies";

// Configuracion de Peticion de Api The Movie Database
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: API_TOKEN,
  },
};

export const MovieFetcher = ({ children }: { children: React.ReactNode }) => {
  const [categoryId, setCategoryId] = useState<TypeMovieFetcher[]>([]);
  const [trailerKey, setTrailerKey] = useState<TrailerKeyVideo[]>([]);


  // funcion para obtener las peliculas mejor valoradas (top_rated) de Api The Movie Database
  const posterPrincipalTop = useCallback(async (page: number) => {
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
  }, []);

  // funcion para obtener peliculas en tendencias(trending) de Api The Movie Database
  const trendingMovie = useCallback(async (page: number) => {
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
  }, []);

  // funcion para obtener peliculas proximas en estrenar (upcoming) de Api The Movie Database
  const unCominggMovie = useCallback(async (page: number) => {
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
  },[]);

  // funcion que obtiener las peliculas populares de Api The Movie Database
  const popular = useCallback(async (page: number) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
        options,
      );

      if (!res.ok) {
        throw new Error("Error al traer peticion");
      }

      const dataPopular = await res.json();
      return dataPopular.results;
    } catch (error) {
      console.log("Error al traer pelicula", error);
    }
  }, []);

  // funcion ue busca películas por texto (query) de Api The Movie Database
  const searchMovies = useCallback(async (query: string) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1&include_adult=false`,
        options,
      );

      if (!res.ok) {
        throw new Error("Error al traer peticion");
      }
      const dataSearch = await res.json();
      return dataSearch.results;
    } catch (error) {
      console.log("Error al traer pelicula", error);
      return [];
    }
  }, []);

  // funcion que obtiener la lista de géneros de películas de Api The Movie Database
  const categoriesHome = useCallback(async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options,
      );

      if (!res.ok) {
        throw new Error("Error al traer peticion");
      }

      const dataCategoryList = await res.json();
      return dataCategoryList.genres;
    } catch (error) {
      console.log("Error al traer pelicula", error);
    }
  }, []);

  // funcion que obtiener películas filtradas por género (id) de Api The Movie Database
  const categoriesForId = useCallback(async (id: number, page: number) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${id}`,
        options,
      );
      if (!res.ok) {
        throw new Error("Error al traer peticion");
      }
      const dataCategoryForId = await res.json();
      setCategoryId(dataCategoryForId.results);
      return dataCategoryForId.results;
    } catch (error) {
      console.log("Error al traer Categorias", error);
      return [];
    }
  }, []);

  // funcion que obtiener trailer películas
  const trailerMovie = useCallback(async (id: number) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        options,
      );
      if (!res.ok) {
        throw new Error("Error al traer peticion");
      }
      const dataTrailer = await res.json();
      setTrailerKey(dataTrailer.results);
      return dataTrailer.results;
    } catch (error) {
      console.log("Error al traer Categorias", error);
      return [];
    }
  }, []);

  return (
    <>
      <MoviesContext.Provider
        value={{
          categoryId,
          trailerKey,
          trendingMovie,
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
