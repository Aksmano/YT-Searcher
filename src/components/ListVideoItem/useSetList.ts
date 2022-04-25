import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSearchPageToken } from "../../services/queryParamsBuilders/searchQuerySlice";
import { setVideoPageToken } from "../../services/queryParamsBuilders/videoQuerySlice";
import { searchResult, video, snippet } from "../../services/types";
import { searchListResponse, videoListResponse } from "../../services/types";
import { selectSearchBar } from "../SearchBar/SearchBarSlice";
import {
  selectListVideoItem,
  setNewFetchedSnippets,
  setUpdate,
  togglePage,
  // setCurrentPage,
} from "./ListVideoItemSlice";

interface useSetListProps {
  data: videoListResponse | searchListResponse | undefined;
  isUninitialized: boolean;
  currentPage: number;
  shouldVideoBeListed: boolean;
}

export const useSetList = ({
  data,
  currentPage,
  isUninitialized,
  shouldVideoBeListed,
}: useSetListProps) => {
  const dispatch = useAppDispatch();
  const searchBar = useAppSelector(selectSearchBar);
  const listVideoItem = useAppSelector(selectListVideoItem);
  // const isPageTokenSet = useRef<boolean>(false);

  useEffect(() => {
    console.log("FROM useSetList", data?.kind);
    if (data !== undefined && !isUninitialized) {
      dispatch(setUpdate(true));
      let isPageTokenSet = false;
      let newFetchedVideos: snippet[] = [];

      for (let i = 0; i < 10; i++) {
        if (
          listVideoItem.fetchedSnippets.length + i ===
          data.pageInfo.totalResults
        )
          break;
        newFetchedVideos.push(data!.items[currentPage * 10 + i].snippet);
      }

      // if (data!.nextPageToken !== undefined)
      //   dispatch(setNewPage(data!.nextPageToken));
      console.log("current page", currentPage);
      console.log("prevPageToken", data!.prevPageToken);

      if (currentPage === 4) {
        isPageTokenSet = true;
        console.log(shouldVideoBeListed);
        console.log("dispatch new token");

        if (shouldVideoBeListed)
          dispatch(setVideoPageToken(data!.nextPageToken));
        else dispatch(setSearchPageToken(data!.nextPageToken));
      }

      if (
        !isPageTokenSet &&
        data!.prevPageToken === undefined &&
        currentPage === 0
      ) {
        console.log("new fetched videos");
        dispatch(setNewFetchedSnippets([...newFetchedVideos]));
      } else {
        console.log("adding videos");

        dispatch(
          setNewFetchedSnippets([
            ...listVideoItem.fetchedSnippets,
            ...newFetchedVideos,
          ])
        );
      }
    } else if (!isUninitialized) dispatch(setUpdate(false));
    console.log(data);
  }, [
    data?.kind,
    currentPage,
    shouldVideoBeListed,
    listVideoItem.toMostPopularToggler,
  ]);
};
