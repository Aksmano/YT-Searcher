import React from "react";
import "./App.css";
import { useAppSelector } from "./app/hooks";
import { selectVideoQuery } from "./services/queryParamsBuilders/videoQuerySlice";
import { useGetListVideosResultQuery } from "./services/youtube";
import videoQueryBuilder from "./services/queryParamsBuilders/videoQueryBuilder";

const App = () => {
  const videoQuery = useAppSelector(selectVideoQuery);
  const query = videoQueryBuilder(videoQuery);
  console.log(query);

  const { data, error, isLoading } = useGetListVideosResultQuery(query);
  console.log(isLoading, data);

  return (
    <div className="App">
      {/* <img src={data?.items[0].snippet.thumbnails["high"]?.url} alt="" />
      {data?.items[0].snippet.title} */}
    </div>
  );
};

export default App;
