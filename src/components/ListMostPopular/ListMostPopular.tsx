import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import queryBuilder from "../../services/queryParamsBuilders/queryBuilder";
import { useGetListVideosResultQuery } from "../../services/youtube";
import { selectListMostPopular, setCurrentPage } from "./ListMostPopularSlice";
import { useSetVideoList } from "./useSetVideoList";
import styles from "./ListMostPopular.module.css";
import Loader from "../Loader/Loader";
import { VideoItem } from "../VideoItem/VideoItem";

export const ListMostPopular = () => {
  const listMostPopular = useAppSelector(selectListMostPopular);
  const dispatch = useAppDispatch();
  const [videoComponentsList, setVideoComponentList] =
    useState<JSX.Element[]>();

  const shouldButtonLoad = (): boolean => {
    return (
      videoList.isUninitialized === false && videoList.isFetching === false
    );
  };

  const shouldButtonRender = (): boolean => {
    return (
      listMostPopular.fetchedInfo.length === 0 ||
      listMostPopular.fetchedInfo.length ===
        videoList.data?.pageInfo.totalResults
    );
  };

  const handleLoadMore = () => {
    console.log("CLICKED LOAD MORE");
    dispatch(setCurrentPage((listMostPopular.currentPage + 1) % 5));
  };

  const videoList = useGetListVideosResultQuery(
    queryBuilder(listMostPopular.videoQuery)
  );

  useSetVideoList({
    data: videoList.data!,
    isFetching: videoList.isFetching,
    isLoading: videoList.isLoading,
  });

  console.log(listMostPopular.fetchedInfo);

  useEffect(() => {
    console.log("Hello there");

    const newVideoComponentList = listMostPopular.fetchedInfo.map((item) => {
      return (
        <VideoItem snippet={item.snippet} videoId={item.id} key={item.id} />
      );
    });
    setVideoComponentList([...newVideoComponentList]);
  }, [listMostPopular.fetchedInfo]);

  return (
    <div className={styles.itemListContainer}>
      <div className={styles.itemList}>
        {videoComponentsList}
        <div className={styles.buttonContainer}>
          {shouldButtonLoad() ? (
            shouldButtonRender() ? (
              ""
            ) : (
              <button
                className={styles.loadMore}
                onClick={() => {
                  handleLoadMore();
                }}
              >
                Load next
              </button>
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};
