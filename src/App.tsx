import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { ComingSoon } from "./components/Coming_Soon";
import { Footer } from "./UI/Footer";
import { TrendingMovie } from "./components/Trending_Movie";
import { UITabBar } from "./UI/TabBar";
import { SearchMovie } from "./components/SearchMovie";
import { PosterPathPrincipal } from "./components/Poster_Path_Principal";
import { NotFound } from "./UI/NotFound";
import { LogoMovie } from "./UI/LogoMovie";
import { Nav } from "./UI/Nav";
import { CategoryMovies } from "./components/Category";
import { Popular } from "./components/Popular";
import { CategoryForMovie } from "./components/Category_List_Movie";
import { My_List_Like_Movie } from "./components/My_List_Like_Movie";

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-secondary via-primary-slow-900 to-secondary">
      
      {isHomePage ? (
        <div className="relative">
          <PosterPathPrincipal />
          <LogoMovie />
          <Nav />
        </div>
      ) : (
        <>
          <LogoMovie />
          <Nav />
        </>
      )}

      <Outlet />
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
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <>
                  <TrendingMovie key="trending_home" /> <ComingSoon />{" "}
                  <Popular />
                  <CategoryMovies />
                </>
              }
            />
            <Route
              path="trending"
              element={<TrendingMovie key="trending_page" />}
            />
            <Route path="coming-soon" element={<ComingSoon />} />
            <Route path="popular" element={<Popular />} />
            <Route path="search" element={<SearchMovie />} />
            <Route path="categories/:name/:id" element={<CategoryForMovie />} />
            <Route path="my_list" element={<My_List_Like_Movie />} />
            <Route
              path="*"
              element={
                <NotFound
                  title="La pagina que buscas no existe"
                  src="/error_404.png"
                  alt="Error 404"
                  error="Error 404"
                  showBtn={true}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
