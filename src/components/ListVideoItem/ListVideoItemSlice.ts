import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import { VideoItem } from "../VideoItem/VideoItem";
import { RootState } from "../../app/store";
import { snippet } from "../../services/types";

export interface ListVideoItemState {
  fetchedSnippets: snippet[];
  pageToggler: boolean;
  toMostPopularToggler: boolean;
  wasUpdated: boolean;
}

const initialState: ListVideoItemState = {
  fetchedSnippets: [],
  pageToggler: true,
  wasUpdated: false,
  toMostPopularToggler: false,
};

export const ListVideoItemSlice = createSlice({
  name: "ListVideoItem",
  initialState,
  reducers: {
    togglePage: (state) => {
      state.pageToggler = !state.pageToggler;
    },
    toggleBackToMostPopular: (state) => {
      state.toMostPopularToggler = !state.toMostPopularToggler;
    },
    setUpdate: (state, action: PayloadAction<boolean>) => {
      state.wasUpdated = action.payload;
    },
    // setCurrentPage: (state, action: PayloadAction<number>) => {
    //   state.currentPage = action.payload;
    // },
    setNewFetchedSnippets: (state, action: PayloadAction<snippet[]>) => {
      const newfetchedSnippets = action.payload.map((item) => {
        return item;
      });
      state.fetchedSnippets = [...newfetchedSnippets];
    },
    addNewFetchedSnippets: (state, action: PayloadAction<snippet[]>) => {
      const newfetchedSnippets = action.payload.map((item) => {
        return item;
      });
      state.fetchedSnippets = [...state.fetchedSnippets, ...newfetchedSnippets];
    },
  },
});

export const selectListVideoItem = (state: RootState) => state.ListVideoItem;

export const {
  // setCurrentPage,
  setUpdate,
  setNewFetchedSnippets,
  addNewFetchedSnippets,
  togglePage,
  toggleBackToMostPopular,
} = ListVideoItemSlice.actions;

export default ListVideoItemSlice.reducer;
