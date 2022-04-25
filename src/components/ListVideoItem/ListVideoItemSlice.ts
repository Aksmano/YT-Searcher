import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import { VideoItem } from "../VideoItem/VideoItem";
import { RootState } from "../../app/store";
import { snippet } from "../../services/types";

export interface ListVideoItemState {
  fetchedSnippets: snippet[];
  currentPage?: string;
}

const initialState: ListVideoItemState = {
  fetchedSnippets: [],
};

export const ListVideoItemSlice = createSlice({
  name: "ListVideoItem",
  initialState,
  reducers: {
    setNewPage: (state, action: PayloadAction<string>) => {
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

export const { setNewPage, setNewFetchedSnippets, addNewFetchedSnippets } =
  ListVideoItemSlice.actions;

export default ListVideoItemSlice.reducer;
