import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { searchResult, video, snippet } from "../../services/types";
import { searchListResponse, videoListResponse } from "../../services/types";
import { selectSearchBar } from "../SearchBar/SearchBarSlice";
import {
  selectListVideoItem,
  setNewFetchedSnippets,
  setCurrentPage,
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
  const listVideoItem = useAppSelector(selectListVideoItem);
  const searchBar = useAppSelector(selectSearchBar);

  useEffect(() => {
    if (data !== undefined && !isUninitialized) {
      console.log("FROM useSetList", data.kind);

      let newFetchedVideos: snippet[] = [];
      for (let i = 0; i < 10; i++) {
        if (
          listVideoItem.fetchedSnippets.length + i ===
          data.pageInfo.totalResults - 2
        )
          break;
        newFetchedVideos.push(data!.items[currentPage * 10 + i].snippet);
      }

      // if (data!.nextPageToken !== undefined)
      //   dispatch(setNewPage(data!.nextPageToken));

      if (data!.prevPageToken === undefined || currentPage === 0)
        dispatch(setNewFetchedSnippets([...newFetchedVideos]));
      else
        dispatch(
          setNewFetchedSnippets([
            ...listVideoItem.fetchedSnippets,
            ...newFetchedVideos,
          ])
        );
    }
    console.log(data);
  }, [data?.kind, currentPage, shouldVideoBeListed]);
};
