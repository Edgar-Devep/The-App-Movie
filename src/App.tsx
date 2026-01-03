import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ComingSoon } from "./components/Coming_Soon";
import { Footer } from "./components/Footer";
import { HomeMovie } from "./components/Home_Movie";
import { UITabBar } from "./components/TabBar";
import { SearchMovie } from "./components/SearchMovie";
import type React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen pt-6 mb-8 bg-linear-to-b from-primary-700 via-primary-slow-800 to-secondary">
      <div className="flex justify-center items-center drop-shadow-[3px_7px_6px_#4E38F3]">
        <p className=" text-2xl md:text-5xl font-bold">The Movie</p>
        <img
          className="bg-transparent w-24 h-auto md:w-48"
          src="/logo_movie.png"
          alt="Logo de Peliculas"
        />
      </div>
      {children}
      <UITabBar />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Layout>
                  <HomeMovie />
                  <ComingSoon />
                </Layout>
              </>
            }
          />
          <Route
            path="/search"
            element={
              <Layout>
                <SearchMovie />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
