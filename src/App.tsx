import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { VideoItem } from "./components/VideoItem/VideoItem";
import { selectSearchQuery } from "./services/queryParamsBuilders/searchQuerySlice";
import { useGetListVideosResultQuery } from "./services/youtube";
import useLocalStorage from "use-local-storage";
import { ListVideoItem } from "./components/ListVideoItem/ListVideoItem";
import Navbar from "./components/Navbar/Navbar";

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
      <button onClick={switchTheme}>Switch theme</button>
      <Navbar switchTheme={switchTheme} />
      <SearchBar />
      {<ListVideoItem />}
      {/* {isLoading ? "" : <VideoItem snippet={data!.items[0].snippet} />} */}
      {/* <img src={data?.items[0].snippet.thumbnails["high"]?.url} alt="" />
      {data?.items[0].snippet.title} */}
      {/* {() => {
        if (!isLoading) console.log(data!.items[0].snippet);
      }} */}
    </div>
  );
};

export default App;
