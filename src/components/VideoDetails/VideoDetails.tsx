import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import queryBuilder from "../../services/queryParamsBuilders/queryBuilder";
import { videoQueryState } from "../../services/queryParamsBuilders/videoQuerySlice";
import { videoListResponse } from "../../services/types";
import { useGetListVideosResultQuery } from "../../services/youtube";
import Loader from "../Loader/Loader";
import styles from "./VideoDetails.module.css";

export const VideoDetails = () => {
  const params = useParams<{ id: string }>();

  const videoDetails: videoQueryState = {
    part: ["snippet", "contentDetails", "statistics", "player"],
    chart: "",
    id: [params.id!],
    maxResults: "1",
  };

  const videoInfo = useGetListVideosResultQuery(queryBuilder(videoDetails));

  const isVideoInfoLoaded = (): boolean => {
    return videoInfo.isLoading === false && videoInfo.isFetching === false;
  };

  console.log(videoInfo);

  return (
    <div className={styles.videoDetails}>
      {isVideoInfoLoaded() ? (
        <iframe
          width="640"
          height="360"
          allowFullScreen={true}
          title="video"
          frameBorder={0}
          src={`https://www.youtube.com/embed/${params.id!}`}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};
