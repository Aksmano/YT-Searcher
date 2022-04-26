import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  extendedSnippet,
  snippet,
  searchListResponse,
} from "../../services/types";
import {
  selectListSearchResult,
  setFechtedInfo,
  setPrevQ,
  setSearchQuery,
} from "./ListSearchResultSlice";

interface useSetVideoListProps {
  data: searchListResponse;
  isFetching: boolean;
  isLoading: boolean;
}

export const useSetSearchResult = ({
  data,
  isFetching,
  isLoading,
}: useSetVideoListProps) => {
  console.log("FROM useSetSearchResult", data?.kind);
  const listSearchResult = useSelector(selectListSearchResult);
  const dispatch = useAppDispatch();
  const isPageTokenSet = useRef<boolean>(false);
  const isEndOfItems = (i: number, data: searchListResponse): boolean => {
    return (
      listSearchResult.fetchedInfo.length + i === data.pageInfo.totalResults &&
      data.prevPageToken !== undefined
    );
  };

  if (data !== undefined && data?.kind !== listSearchResult.prevKind) {
    console.log("Changed datatype");
    dispatch(setPrevQ(data?.kind));
  }

  console.log("use Ref", isPageTokenSet.current);

  if (listSearchResult.currentPage === 4 && !isPageTokenSet.current)
    isPageTokenSet.current = true;
  else if (listSearchResult.currentPage === 4 && isPageTokenSet.current)
    isPageTokenSet.current = false;
  else isPageTokenSet.current = false;

  useEffect(() => {
    console.log("FROM useEffect", data?.kind);

    if (data !== undefined && !isFetching && !isLoading) {
      console.log("is true");

      let newFetchedVideos: extendedSnippet[] = [];
      let snippetData: snippet;

      for (let i = 0; i < 10; i++) {
        if (isEndOfItems(i, data)) break;

        snippetData =
          data!.items[listSearchResult.currentPage * 10 + i].snippet;
        if (data.kind === "youtube#searchListResponse")
          newFetchedVideos.push({
            snippet: snippetData,
            id: data!.items[listSearchResult.currentPage * 10 + i].id.videoId,
          });
      }

      if (isPageTokenSet.current) {
        dispatch(
          setSearchQuery({
            ...listSearchResult.searchQuery,
            pageToken: data!.nextPageToken,
          })
        );
      }

      if (
        !isPageTokenSet.current &&
        data!.prevPageToken === undefined &&
        listSearchResult.currentPage === 0
      ) {
        console.log("new fetched videos", newFetchedVideos);
        dispatch(setFechtedInfo([...newFetchedVideos]));
      } else {
        console.log("adding videos");

        dispatch(
          setFechtedInfo([...listSearchResult.fetchedInfo, ...newFetchedVideos])
        );
      }
    }
  }, [
    listSearchResult.currentPage,
    listSearchResult.prevKind,
    listSearchResult.prevQ,
    listSearchResult.toggler,
    isFetching,
  ]);
};
