import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectVideoQuery,
  setVideoPageToken,
} from "../../services/queryParamsBuilders/videoQuerySlice";
import {
  useGetListSearchResultQuery,
  useGetListVideosResultQuery,
} from "../../services/youtube";
import queryBuilder from "../../services/queryParamsBuilders/queryBuilder";
import { VideoItem } from "../VideoItem/VideoItem";
import styles from "./ListVideoItem.module.css";
import {
  selectSearchQuery,
  setSearchPageToken,
} from "../../services/queryParamsBuilders/searchQuerySlice";
import { selectSearchBar, setOff } from "../SearchBar/SearchBarSlice";
import { useSetList } from "./useSetList";
import { selectListVideoItem } from "./ListVideoItemSlice";
import Loader from "../Loader/Loader";
import { useLocation } from "react-router-dom";

export const ListVideoItem = () => {
  const listVideoItem = useAppSelector(selectListVideoItem);
  const videoQuery = useAppSelector(selectVideoQuery);
  const searchQuery = useAppSelector(selectSearchQuery);
  const searchBar = useAppSelector(selectSearchBar);

  const dispatch = useAppDispatch();

  const [videoItemsList, setVideoItemsList] = useState<JSX.Element[]>([]);
  const [hasSettingVideoItemsEnded, setHasSettingVideoItemsEnded] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasPaginationEnded, setHasPaginationEnded] = useState<boolean>(true);
  const [shouldVideoBeListed, setShouldVideoBeListed] = useState<boolean>(true);

  let key = 0;

  // const location = useLocation();
  // console.log(location.pathname);

  const videoList = useGetListVideosResultQuery(queryBuilder(videoQuery), {
    skip: shouldVideoBeListed === false,
  });

  // console.log("videoList", videoList);
  // console.log(currentPage);

  const searchList = useGetListSearchResultQuery(queryBuilder(searchQuery), {
    skip: shouldVideoBeListed === true,
  });

  const handleLoadMore = () => {
    setCurrentPage((page) => (page + 1) % 5);
    if (currentPage === 0) {
      if (shouldVideoBeListed)
        dispatch(setVideoPageToken(videoList.data!.nextPageToken));
      else dispatch(setSearchPageToken(searchList.data!.nextPageToken));
    }
    setHasPaginationEnded(false);
    // console.log(searchList.data!.nextPageToken);

    // console.log(searchQuery);
    // console.log(searchBar.isSearching);
  };

  // console.log("searchList", searchList);

  useEffect(() => {
    setCurrentPage(0);
    console.log("toggled");
  }, [listVideoItem.pageToggler]);

  useSetList({
    data: videoList.data,
    isUninitialized: videoList.isUninitialized,
    currentPage,
    shouldVideoBeListed,
  });
  useSetList({
    data: searchList.data,
    isUninitialized: searchList.isUninitialized,
    currentPage,
    shouldVideoBeListed,
  });
  // console.log(listVideoItem);

  useEffect(() => {
    if (searchBar.isSearching) setShouldVideoBeListed(false);
    else {
      // dispatch(setOff());
      setShouldVideoBeListed(true);
      setVideoPageToken("");
    }
    setCurrentPage(0);
    console.log("ShouldVideoBeListed:", shouldVideoBeListed);
  }, [searchBar.isSearching]);

  useEffect(() => {
    if (hasPaginationEnded) {
      console.log("???");
      setHasSettingVideoItemsEnded(false);
      setCurrentPage(0);
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log("IM HERE", listVideoItem.fetchedSnippets);
    setHasSettingVideoItemsEnded(false);
    if (listVideoItem.fetchedSnippets.length > 0) {
      const newVideoItemsList = listVideoItem.fetchedSnippets.map((item) => {
        key++;
        return <VideoItem snippet={item} key={key} />;
      });
      setVideoItemsList([...newVideoItemsList]);
      setHasSettingVideoItemsEnded(true);
      setHasPaginationEnded(true);
    }
  }, [listVideoItem.fetchedSnippets, currentPage]);

  return (
    <div className={styles.itemListContainer}>
      <div className={styles.itemList}>
        {hasSettingVideoItemsEnded ? videoItemsList : <Loader />}
        <div className={styles.buttonContainer}>
          {hasPaginationEnded ? (
            listVideoItem.fetchedSnippets.length === 0 ||
            listVideoItem.fetchedSnippets.length ===
              (videoList.data?.pageInfo.totalResults ||
                searchList.data?.pageInfo.totalResults) ? (
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
