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
      <Navbar switchTheme={switchTheme} />
      <Routes>
        <Route path="/" element={<ListVideoItem />}></Route>
        <Route path="/test" element={<ListMostPopular />} />
        <Route path="/video/:id" element={<VideoDetails />} />
      </Routes>
    </div>
  );
};

export default App;
