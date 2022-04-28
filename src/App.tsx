import "./App.css";
import useLocalStorage from "use-local-storage";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { VideoDetails } from "./components/VideoDetails/VideoDetails";
import { ListMostPopular } from "./components/ListMostPopular/ListMostPopular";
import { ListSearchResult } from "./components/ListSearchResult/ListSearchResult";
import { SearchBar } from "./components/SearchBar/SearchBar";

const App = () => {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="App" data-theme={theme}>
      <Navbar switchTheme={switchTheme} />
      <SearchBar />
      <Routes>
        <Route path="/" element={<ListMostPopular />}></Route>
        <Route path="/search/" element={<ListSearchResult />} />
        <Route path="/video/:id" element={<VideoDetails />} />
      </Routes>
    </div>
  );
};

export default App;
