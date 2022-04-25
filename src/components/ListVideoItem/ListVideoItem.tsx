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
import { selectSearchBar } from "../SearchBar/SearchBarSlice";
import { useSetList } from "./useSetList";
import { selectListVideoItem } from "./ListVideoItemSlice";
import Loader from "../Loader/Loader";

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
  const [shouldVideoListed, setShouldVideoListed] = useState<boolean>(true);

  let key = 0;

  const videoList = useGetListVideosResultQuery(queryBuilder(videoQuery), {
    skip: shouldVideoListed === false,
  });

  // console.log("videoList", videoList);
  console.log(currentPage);

  const searchList = useGetListSearchResultQuery(queryBuilder(searchQuery), {
    skip: shouldVideoListed === true,
  });

  const handleLoadMore = () => {
    setCurrentPage((page) => (page + 1) % 5);
    if (currentPage === 0) {
      if (shouldVideoListed)
        dispatch(setVideoPageToken(videoList.data!.nextPageToken));
      else dispatch(setSearchPageToken(searchList.data!.nextPageToken));
    }
    setHasPaginationEnded(false);
    // console.log(searchList.data!.nextPageToken);

    // console.log(searchQuery);
    // console.log(searchBar.isClicked);
  };

  // console.log("searchList", searchList);

  useSetList({ data: videoList.data, currentPage });
  useSetList({ data: searchList.data, currentPage });

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
            <button
              className={styles.loadMore}
              onClick={() => {
                handleLoadMore();
              }}
            >
              Load next
            </button>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { selectVideoQuery } from "../../services/queryParamsBuilders/videoQuerySlice";
// import { searchListResponse, snippet } from "../../services/types";
// import {
//   useGetListSearchResultQuery,
//   useGetListVideosResultQuery,
// } from "../../services/youtube";
// import queryBuilder from "../../services/queryParamsBuilders/queryBuilder";
// import { VideoItem } from "../VideoItem/VideoItem";
// import styles from "./ListVideoItem.module.css";
// import { selectSearchQuery } from "../../services/queryParamsBuilders/searchQuerySlice";
// import { selectsearchBar, setOff } from "../SearchBar/SearchBarSlice";
// import { useGetList } from "./useGetList";

// export const ListVideoItem = () => {
//   const [videoItemList, setVideoItemList] = useState<JSX.Element[]>([]);
//   const [fetchedSnippets, setFetchedSnippets] = useState<snippet[]>([]);
//   const [fetchedSearches, setFetchedSearches] = useState<searchListResponse>();
//   const [videoQuantity, setVideoQuantity] = useState<number>(0);
//   const [currentPage, setCurrentPage] = useState<number>(-1);
//   const videoQuery = useAppSelector(selectVideoQuery);
//   const searchQuery = useAppSelector(selectSearchQuery);
//   const searchBar = useAppSelector(selectsearchBar);
//   const dispatch = useAppDispatch();

//   let key = 0;

//   const videoList = useGetListVideosResultQuery(queryBuilder(videoQuery), {
//     skip: currentPage !== -1,
//   });

//   const searchList = useGetListSearchResultQuery(queryBuilder(searchQuery), {
//     skip: searchBar.isClicked === false,
//   });

//   console.log("From listVideoItem", videoList);
//   console.log("From listVideoItem", searchList);

//   // USE IT AS CUSTOM HOOK

//   useGetList(
//     videoList.data,
//     videoList.status,
//     setCurrentPage,
//     setFetchedSnippets
//   );
//   useGetList(
//     searchList.data,
//     searchList.status,
//     setCurrentPage,
//     setFetchedSnippets
//   );

//   // useEffect(() => {
//   //   if (videoList.data !== undefined) {
//   //     const newFetchedSnippets = videoList.data.items.map((item) => {
//   //       return item.snippet;
//   //     });
//   //     setCurrentPage((v) => v + 1);
//   //     setFetchedSnippets(() => [...newFetchedSnippets]);
//   //   }
//   //   console.log(videoList.isLoading, videoList.data);
//   // }, [videoList.data]);

//   // useEffect(() => {
//   //   if (searchList.data !== undefined) {
//   //     const newFetchedSnippets = searchList.data.items.map((item) => {
//   //       return item.snippet;
//   //     });
//   //     setCurrentPage(0);
//   //     setFetchedSnippets(() => [...newFetchedSnippets]);
//   //   }
//   //   console.log(searchList.isLoading, searchList.data);
//   // }, [searchList.data]);

//   useEffect(() => {
//     if (!videoList.isLoading) {
//       let s = [];
//       for (let i = 0; i < videosPerPage; i++) {
//         s.push(
//           <VideoItem
//             snippet={fetchedSnippets[videosPerPage * currentPage + i]}
//             key={videosPerPage * currentPage + i}
//           />
//         );
//         console.log("ss");
//       }
//       setVideoItemList([...videoItemList, ...s]);
//     }
//   }, [currentPage]);

//   return (
//     <div className={styles.itemListContainer}>
//       <div className={styles.itemList}>
//         {videoList.isLoading ? "Loading..." : videoItemList}
//       </div>
//       <button onClick={}>Load next</button>
//     </div>
//   );
// };
