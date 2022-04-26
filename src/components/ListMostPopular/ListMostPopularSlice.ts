import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import { VideoItem } from "../VideoItem/VideoItem";
import { RootState } from "../../app/store";
import { extendedSnippet } from "../ListVideoItem/ListVideoItemSlice";
import { videoQueryState } from "../../services/queryParamsBuilders/videoQuerySlice";

export interface ListMostPopularState {
  fetchedInfo: extendedSnippet[];
  currentPage: number;
  prevKind: string;
  toggler: boolean,
  videoQuery: videoQueryState;
}

const initialState: ListMostPopularState = {
  fetchedInfo: [],
  currentPage: 0,
  prevKind: "",
  toggler: false,
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
    setPrevKind: (state, action: PayloadAction<string>) => {
      state.prevKind = action.payload
    },
    toggleLoad: (state) => {
      state.toggler = !state.toggler
    }
  },
});

export const selectListMostPopular = (state: RootState) =>
  state.ListMostPopular;

export const { setFechtedInfo, setCurrentPage, setVideoQuery, setPrevKind, toggleLoad } =
  ListMostPopularSlice.actions;

export default ListMostPopularSlice.reducer;
