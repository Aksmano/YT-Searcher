import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ListComponent } from "../../services/types";
import { setMOCurrentPage } from "../ListMostPopular/ListMostPopularSlice";
import { VideoItem } from "../VideoItem/VideoItem";
import Loader from "../Loader/Loader";
import styles from "./ListComponents.module.css";
import { setSRCurrentPage } from "../ListSearchResult/ListSearchResultSlice";
import { selectSearchBar } from "../SearchBar/SearchBarSlice";

interface ListComponentsProps {
  itemList: ListComponent;
  type: string;
  isUninitialized: boolean;
  isFetching: boolean;
  totalResults?: number;
}

export const ListComponents = ({
  itemList,
  type,
  isUninitialized,
  isFetching,
  totalResults,
}: ListComponentsProps) => {
  const dispatch = useAppDispatch();
  const [videoComponentsList, setVideoComponentList] =
    useState<JSX.Element[]>();
  const searchBar = useAppSelector(selectSearchBar);
  const key = useRef<number>(0);

  const shouldButtonLoad = (): boolean => {
    return isUninitialized === false && isFetching === false;
  };

  const shouldButtonRender = (): boolean => {
    return (
      itemList.fetchedInfo.length === 0 ||
      itemList.fetchedInfo.length === totalResults
    );
  };

  const shouldVideosNotShow = (): boolean => {
    return isFetching && type === "search result" && searchBar.isSearching;
  };

  const handleLoadMore = () => {
    if (type === "most popular")
      dispatch(setMOCurrentPage((itemList.currentPage + 1) % 5));
    else if (type === "search result")
      dispatch(setSRCurrentPage((itemList.currentPage + 1) % 5));
  };

  useEffect(() => {
    const newVideoComponentList = itemList.fetchedInfo.map((item) => {
      key.current++;
      return (
        <VideoItem snippet={item.snippet} videoId={item.id} key={key.current} />
      );
    });
    setVideoComponentList([...newVideoComponentList]);
  }, [itemList.fetchedInfo]);

  return (
    <div className={styles.itemListContainer}>
      <div className={styles.itemList}>
        {shouldVideosNotShow() ? <Loader /> : videoComponentsList}
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
