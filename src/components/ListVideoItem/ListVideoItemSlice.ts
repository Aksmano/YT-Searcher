import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import { VideoItem } from "../VideoItem/VideoItem";
import { RootState } from "../../app/store";
import { snippet } from "../../services/types";

export interface ListVideoItemState {
  fetchedSnippets: snippet[];
  pageToggler: boolean;
  currentPage: number;
}

const initialState: ListVideoItemState = {
  fetchedSnippets: [],
  pageToggler: true,
  currentPage: 0,
};

export const ListVideoItemSlice = createSlice({
  name: "ListVideoItem",
  initialState,
  reducers: {
    togglePage: (state) => {
      state.pageToggler = !state.pageToggler;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
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
  setCurrentPage,
  setNewFetchedSnippets,
  addNewFetchedSnippets,
  togglePage,
} = ListVideoItemSlice.actions;

export default ListVideoItemSlice.reducer;
