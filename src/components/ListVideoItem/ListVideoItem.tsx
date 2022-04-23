import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectVideoQuery } from "../../services/queryParamsBuilders/videoQuerySlice";
import { video } from "../../services/types";
import { useGetListVideosResultQuery } from "../../services/youtube";
import queryBuilder from "../../services/queryParamsBuilders/queryBuilder";
import { VideoItem } from "../VideoItem/VideoItem";
import styles from "./ListVideoItem.module.css";

export const ListVideoItem = () => {
  const [videoItemList, setVideoItemList] = useState<JSX.Element[]>([]);
  const videoQuery = useAppSelector(selectVideoQuery);
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useGetListVideosResultQuery(
    queryBuilder(videoQuery)
  );

  useEffect(() => {
    if (data !== undefined) {
      const newVideoItemList = data.items.map((item) => {
        return <VideoItem snippet={item.snippet} />;
      });

      console.log(isLoading, data);

      setVideoItemList(() => [...videoItemList, ...newVideoItemList]);
    }
  }, [data]);

  return (
    <div className={styles.itemList}>
      {isLoading ? "Loading..." : videoItemList}
    </div>
  );
};
