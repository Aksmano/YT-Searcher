import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { selectSearchQuery } from "./services/queryParamsBuilders/searchQuerySlice";
import { useGetListVideosResultQuery } from "./services/youtube";
import useLocalStorage from "use-local-storage";
import { ListVideoItem } from "./components/ListVideoItem/ListVideoItem";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { VideoDetails } from "./components/VideoDetails/VideoDetails";
import { ListMostPopular } from "./components/ListMostPopular/ListMostPopular";
import { ListSearchResult } from "./components/ListSearchResult/ListSearchResult";
import { FiltersBar } from "./components/FiltersBar/FiltersBar";
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

  const querySearch = useSelector(selectSearchQuery);

  console.log("query app", querySearch);

  // const { data, isLoading } = useGetListVideosResultQuery(
  //   "&part=snippet%2CcontentDetails%2Cstatistics&id=Hhi1X0sVYeM"
  // );

  // console.log(isLoading, data);

  return (
    <div className="App" data-theme={theme}>
      {/* <FiltersBar /> */}
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
