import { useEffect } from "react";
import { snippet } from "../../services/types";
import { searchListResponse, videoListResponse } from "../../services/types";

// export const useGetList = (
//   data: videoListResponse | searchListResponse | undefined,
//   setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
//   setFetchedVideos: React.Dispatch<React.SetStateAction<snippet[]>>
// ) => {
//   useEffect(() => {
//     if (data !== undefined) {
//       const newFetchedVideos = data.items.map((item) => {
//         return item.snippet;
//       });
//       setCurrentPage((v) => v + 1);
//       setFetchedVideos(() => [...newFetchedVideos]);
//     }
//     console.log(data);
//   }, [data]);
// };
