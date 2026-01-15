import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ComingSoon } from "./components/Coming_Soon";
import { Footer } from "./UI/Footer";
import { HomeMovie } from "./components/Home_Movie";
import { UITabBar } from "./UI/TabBar";
import { SearchMovie } from "./components/SearchMovie";
import { PosterPathPrincipal } from "./components/Poster_Path_Principal";
import { NotFound } from "./UI/NotFound";
import { LogoMovie } from "./UI/LogoMovie";

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-secondary via-primary-slow-800 to-secondary">
      {isHomePage ? (
        <div className="relative">
          <PosterPathPrincipal />
          <LogoMovie overlay />
        </div>
      ) : (
        <LogoMovie />
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
                  <HomeMovie /> <ComingSoon />
                </>
              }
            />
            <Route path="search" element={<SearchMovie />} />
            <Route path="/Populares" element={<HomeMovie />} />
            <Route path="/Proximamente" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
