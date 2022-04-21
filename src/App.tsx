import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { selectSearchQuery } from "./services/queryParamsBuilders/searchQuerySlice";

const App = () => {
  const querySearch = useSelector(selectSearchQuery);

  console.log("query app", querySearch);

  return (
    <div className="App">
      <SearchBar />
      {/* <img src={data?.items[0].snippet.thumbnails["high"]?.url} alt="" />
      {data?.items[0].snippet.title} */}
    </div>
  );
};

export default App;
