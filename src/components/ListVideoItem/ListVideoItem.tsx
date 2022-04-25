import { useEffect, useRef, useState } from "react";
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
import {
  selectListVideoItem,
  setUpdate,
  toggleBackToMostPopular,
} from "./ListVideoItemSlice";
import Loader from "../Loader/Loader";
import { useLocation } from "react-router-dom";
import { usePaginationEnd } from "./usePaginationEnd";

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
  // const [hasPaginationEnded, setHasPaginationEnded] = useState<boolean>(true);
  const [shouldVideoBeListed, setShouldVideoBeListed] = useState<boolean>(true);

  const key = useRef<number>(0);
  const prevItemQuantity = useRef<number>(0);

  const shouldButtonLoad = (): boolean => {
    return (
      (videoList.isUninitialized === false && videoList.isFetching === false) ||
      (searchList.isUninitialized === false && searchList.isFetching === false)
    );
  };

  const shouldButtonRender = (): boolean => {
    return (
      listVideoItem.fetchedSnippets.length === 0 ||
      listVideoItem.fetchedSnippets.length ===
        (videoList.data?.pageInfo.totalResults ||
          searchList.data?.pageInfo.totalResults)
    );
  };

  const shouldVideosRender = (): boolean => {
    return (
      (videoList.isLoading === false && videoList.isFetching === false) ||
      (searchList.isLoading === false && searchList.isFetching === false)
    );
  };

  // const location = useLocation();
  // console.log(location.pathname);

  const videoList = useGetListVideosResultQuery(queryBuilder(videoQuery), {
    skip: shouldVideoBeListed === false,
  });

  // console.log("videoList", videoList);
  // console.log("videoQuery", videoQuery);

  // console.log(currentPage);

  const searchList = useGetListSearchResultQuery(queryBuilder(searchQuery), {
    skip: shouldVideoBeListed === true,
  });

  // console.log("searchList", searchList);

  const handleLoadMore = () => {
    console.log("CLICKED LOAD MORE");

    setCurrentPage((page) => (page + 1) % 5);
    // setHasPaginationEnded(false);
  };

  useEffect(() => {
    if (currentPage === 0) dispatch(toggleBackToMostPopular());
    else setCurrentPage(0);
    dispatch(setUpdate(false));
    console.log(videoQuery);
    console.log(searchQuery, searchList);

    prevItemQuantity.current = 0;
    console.log("toggled", prevItemQuantity.current);
  }, [
    listVideoItem.pageToggler,
    searchBar.searchToggler,
    searchList.isFetching,
  ]);

  useSetList({
    data: videoList.data,
    isUninitialized: videoList.isUninitialized,
    isFetching: videoList.isFetching,
    currentPage,
    shouldVideoBeListed,
  });

  useSetList({
    data: searchList.data,
    isUninitialized: searchList.isUninitialized,
    isFetching: searchList.isFetching,
    currentPage,
    shouldVideoBeListed,
  });
  // console.log(listVideoItem);

  // usePaginationEnd({
  //   isFetching: videoList.isFetching,
  //   setHasPaginationEnded,
  // });

  // usePaginationEnd({
  //   isFetching: searchList.isFetching,
  //   setHasPaginationEnded,
  // });

  // console.log(hasPaginationEnded);

  // useEffect(() => {
  //   if (videoList.isFetching || searchList.isFetching)
  //     setHasPaginationEnded(false);
  //   else setHasPaginationEnded(true);
  // }, [videoList.isFetching, searchList.isFetching]);

  useEffect(() => {
    if (searchBar.isSearching) {
      setShouldVideoBeListed(false);
      dispatch(setSearchPageToken(""));
    } else {
      // dispatch(setOff());
      setShouldVideoBeListed(true);
      dispatch(setVideoPageToken(""));
    }
    setCurrentPage(0);
    console.log("ShouldVideoBeListed:", shouldVideoBeListed);
  }, [searchBar.isSearching]);

  useEffect(() => {
    // if (searchQuery) {
    console.log("???");
    setHasSettingVideoItemsEnded(false);

    // setCurrentPage(0);
    // }
  }, [searchQuery]);

  useEffect(() => {
    // console.log(
    //   "IM HERE",
    //   listVideoItem.fetchedSnippets,
    //   listVideoItem.wasUpdated
    // );
    setHasSettingVideoItemsEnded(false);
    if (
      listVideoItem.wasUpdated &&
      listVideoItem.fetchedSnippets.length > prevItemQuantity.current
    ) {
      console.log("DO YOU COPY");

      prevItemQuantity.current = listVideoItem.fetchedSnippets.length;
      const newVideoItemsList = listVideoItem.fetchedSnippets.map((item) => {
        key.current++;
        return (
          <VideoItem
            snippet={item.snippet}
            videoId={item.videoId}
            key={key.current}
          />
        );
      });
      setVideoItemsList([...newVideoItemsList]);
    }
    // setHasPaginationEnded(true);
    setHasSettingVideoItemsEnded(true);
  }, [listVideoItem.fetchedSnippets, currentPage]);

  return (
    <div className={styles.itemListContainer}>
      <div className={styles.itemList}>
        {hasSettingVideoItemsEnded ? videoItemsList : <Loader />}
        <div className={styles.buttonContainer}>
          {shouldButtonLoad() && hasSettingVideoItemsEnded ? (
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
