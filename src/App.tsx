import React from "react";
import "./App.css";
import { useGetListVideosResultQuery } from "./services/youtube";

const App = () => {
  const { data, error, isLoading } = useGetListVideosResultQuery(
    "part=contentDetails%2Csnippet%2Cstatus%2Cstatistics%2Cplayer%2CtopicDetails%2CrecordingDetails%2Clocalizations%2CliveStreamingDetails&id=Ks-_Mh1QhMc"
  );

  return (
    <div className="App">
      <img src={data?.items[0].snippet.thumbnails["high"]?.url} alt="" />
      {data?.items[0].snippet.title}
    </div>
  );
};

export default App;
