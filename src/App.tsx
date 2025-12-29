import { ComingSoon } from "./components/Coming_Soon";
import { HomeMovie } from "./components/Home_Movie";

function App() {
  return (
    <div className="w-full h-screen sm:h-full p-6 bg-linear-to-b from-primary-700 via-primary-slow-800 to-secondary">
      <HomeMovie />
      <ComingSoon />
    </div>
  );
}

export default App;
