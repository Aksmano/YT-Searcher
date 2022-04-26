import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { searchQueryState } from "../types";

const initialState: searchQueryState = {
  part: ["snippet"],
  type: ["video"],
  maxResults: "50",
  pageToken: "",
};

export const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState,
  reducers: {
    addSearchType: (state, action: PayloadAction<string>) => {
      if (state.type!.indexOf(action.payload) === -1)
        state.type!.push(action.payload);
    },
    delSearchType: (state, action: PayloadAction<string>) => {
      state.type = state.type!.filter((value, index, arr) => {
        return value !== action.payload;
      });
    },
    newSearchQueryTerm: (state, action: PayloadAction<string>) => {
      state.q = action.payload;
    },
    setSearchPageToken: (state, action: PayloadAction<string>) => {
      state.pageToken = action.payload;
    },
  },
});

export const selectSearchQuery = (state: RootState) => state.searchQuery;

export const {
  addSearchType,
  delSearchType,
  newSearchQueryTerm,
  setSearchPageToken,
} = searchQuerySlice.actions;

export default searchQuerySlice.reducer;
