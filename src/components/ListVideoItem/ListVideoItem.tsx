import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectVideoQuery } from "../../services/queryParamsBuilders/videoQuerySlice";
import { searchListResponse, snippet } from "../../services/types";
import {
  useGetListSearchResultQuery,
  useGetListVideosResultQuery,
} from "../../services/youtube";
import queryBuilder from "../../services/queryParamsBuilders/queryBuilder";
import { VideoItem } from "../VideoItem/VideoItem";
import styles from "./ListVideoItem.module.css";
import { selectSearchQuery } from "../../services/queryParamsBuilders/searchQuerySlice";
import { selectsearchBar, setOff } from "../SearchBar/SearchBarSlice";

export const ListVideoItem = () => {
  const [videoItemList, setVideoItemList] = useState<JSX.Element[]>([]);
  const [fetchedVideos, setFetchedVideos] = useState<snippet[]>([]);
  const [fetchedSearches, setFetchedSearches] = useState<searchListResponse>();
  const [videoQuantity, setVideoQuantity] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(-1);
  const videoQuery = useAppSelector(selectVideoQuery);
  const searchQuery = useAppSelector(selectSearchQuery);
  const searchBar = useAppSelector(selectsearchBar);
  const dispatch = useAppDispatch();

  const videosPerPage = 10;

  const initialList = useGetListVideosResultQuery(queryBuilder(videoQuery), {
    skip: currentPage !== -1,
  });

  const searchList = useGetListSearchResultQuery(queryBuilder(searchQuery), {
    skip: searchBar.isClicked === false,
  });

  console.log("From listVideoItem", searchList);

  // USE IT AS CUSTOM HOOK

  // useGetList(initialList.data, setCurrentPage, setFetchedVideos);
  // useGetList(initialList.data, setCurrentPage, setFetchedVideos);

  useEffect(() => {
    if (initialList.data !== undefined) {
      const newFetchedVideos = initialList.data.items.map((item) => {
        return item.snippet;
      });
      setCurrentPage((v) => v + 1);
      setFetchedVideos(() => [...newFetchedVideos]);
    }
    console.log(initialList.isLoading, initialList.data);
  }, [initialList.data]);

  useEffect(() => {
    if (!initialList.isLoading) {
      let s = [];
      for (let i = 0; i < videosPerPage; i++) {
        s.push(
          <VideoItem
            snippet={fetchedVideos[videosPerPage * currentPage + i]}
            key={videosPerPage * currentPage + i}
          />
        );
        console.log("ss");
      }
      setVideoItemList([...videoItemList, ...s]);
    }
  }, [currentPage]);

  return (
    <div className={styles.itemListContainer}>
      <div className={styles.itemList}>
        {initialList.isLoading ? "Loading..." : videoItemList}
      </div>
      <button
        onClick={() => {
          setCurrentPage((v) => v + 1);
        }}
      >
        Load next
      </button>
    </div>
  );
};
