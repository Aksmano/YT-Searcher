import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  extendedSnippet,
  snippet,
  videoListResponse,
} from "../../services/types";
import {
  selectListMostPopular,
  setFechtedInfo,
  setPrevKind,
  setVideoQuery,
} from "./ListMostPopularSlice";

interface useSetVideoListProps {
  data: videoListResponse;
  isFetching: boolean;
  isLoading: boolean;
}

export const useSetMostPopular = ({
  data,
  isFetching,
  isLoading,
}: useSetVideoListProps) => {
  const listMostPopular = useSelector(selectListMostPopular);
  const dispatch = useAppDispatch();

  const isEndOfItems = (i: number, data: videoListResponse): boolean => {
    return (
      listMostPopular.fetchedInfo.length + i === data.pageInfo.totalResults &&
      data.prevPageToken !== undefined
    );
  };

  if (data !== undefined && data?.kind !== listMostPopular.prevKind) {
    dispatch(setPrevKind(data?.kind));
  }

  useEffect(() => {
    if (data !== undefined && !isFetching && !isLoading) {
      let isPageTokenSet = false;
      let newFetchedVideos: extendedSnippet[] = [];
      let snippetData: snippet;

      for (let i = 0; i < 10; i++) {
        if (isEndOfItems(i, data)) break;

        snippetData = data!.items[listMostPopular.currentPage * 10 + i].snippet;
        if (data.kind === "youtube#videoListResponse")
          newFetchedVideos.push({
            snippet: snippetData,
            id: data!.items[listMostPopular.currentPage * 10 + i].id,
          });
      }

      if (listMostPopular.currentPage === 4) {
        isPageTokenSet = true;

        dispatch(
          setVideoQuery({
            ...listMostPopular.videoQuery,
            pageToken: data!.nextPageToken,
          })
        );
      }

      if (
        !isPageTokenSet &&
        data!.prevPageToken === undefined &&
        listMostPopular.currentPage === 0
      ) {
        dispatch(setFechtedInfo([...newFetchedVideos]));
      } else {
        dispatch(
          setFechtedInfo([...listMostPopular.fetchedInfo, ...newFetchedVideos])
        );
      }
    }
  }, [
    listMostPopular.currentPage,
    listMostPopular.prevKind,
    listMostPopular.toggler,
  ]);
};
