import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { VideoItem } from "./components/VideoItem/VideoItem";
import { selectSearchQuery } from "./services/queryParamsBuilders/searchQuerySlice";
import { useGetListVideosResultQuery } from "./services/youtube";
import useLocalStorage from "use-local-storage";

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

  const { data, isLoading } = useGetListVideosResultQuery(
    "&part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc"
  );

  console.log(isLoading, data);

  return (
    <div className="App" data-theme={theme}>
      <button onClick={switchTheme}>Switch theme</button>
      {/* <SearchBar /> */}
      {isLoading ? "" : <VideoItem video={data!.items[0]} />}
      {/* <img src={data?.items[0].snippet.thumbnails["high"]?.url} alt="" />
      {data?.items[0].snippet.title} */}
    </div>
  );
};

export default App;
