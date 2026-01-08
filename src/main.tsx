import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MovieFetcher } from "./components/Apis_Context/MovieFetcher.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MovieFetcher>
      <App />
    </MovieFetcher>
  </StrictMode>
);
