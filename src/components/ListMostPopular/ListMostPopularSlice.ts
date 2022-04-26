import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import { VideoItem } from "../VideoItem/VideoItem";
import { RootState } from "../../app/store";
import { extendedSnippet } from "../ListVideoItem/ListVideoItemSlice";
import { videoQueryState } from "../../services/queryParamsBuilders/videoQuerySlice";

export interface ListMostPopularState {
  fetchedInfo: extendedSnippet[];
  currentPage: number;
  videoQuery: videoQueryState;
}

const initialState: ListMostPopularState = {
  fetchedInfo: [],
  currentPage: 0,
  videoQuery: {
    part: ["snippet", "contentDetails", "statistics"],
    chart: "mostPopular",
    id: [],
    maxResults: "50",
  },
};

export const ListMostPopularSlice = createSlice({
  name: "ListMostPopular",
  initialState,
  reducers: {
    setFechtedInfo: (state, action: PayloadAction<extendedSnippet[]>) => {
      const newfetchedInfo = action.payload.map((item) => {
        return item;
      });
      state.fetchedInfo = [...newfetchedInfo];
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setVideoQuery: (state, action: PayloadAction<videoQueryState>) => {
      state.videoQuery = { ...action.payload };
    },
  },
});

export const selectListMostPopular = (state: RootState) =>
  state.ListMostPopular;

export const { setFechtedInfo, setCurrentPage, setVideoQuery } =
  ListMostPopularSlice.actions;

export default ListMostPopularSlice.reducer;
