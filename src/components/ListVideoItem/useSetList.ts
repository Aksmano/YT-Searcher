import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { searchResult, video, snippet } from "../../services/types";
import { searchListResponse, videoListResponse } from "../../services/types";
import {
  selectListVideoItem,
  setNewFetchedSnippets,
  setNewPage,
} from "./ListVideoItemSlice";

interface useSetListProps {
  data: videoListResponse | searchListResponse | undefined;
  currentPage: number;
  shouldVideoBeListed: boolean;
}

export const useSetList = ({ data, currentPage }: useSetListProps) => {
  const dispatch = useAppDispatch();
  const listVideoItem = useAppSelector(selectListVideoItem);

  useEffect(() => {
    if (data !== undefined) {
      console.log("FROM useSetList");

      let newFetchedVideos: snippet[] = [];
      for (let i = 0; i < 10; i++) {
        if (
          listVideoItem.fetchedSnippets.length + i ===
          data.pageInfo.totalResults - 2
        )
          break;
        newFetchedVideos.push(data!.items[currentPage * 10 + i].snippet);
      }

      if (data!.nextPageToken !== undefined)
        dispatch(setNewPage(data!.nextPageToken));

      if (data!.prevPageToken === undefined && currentPage === 0)
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
  }, [data?.kind, currentPage]);
};
