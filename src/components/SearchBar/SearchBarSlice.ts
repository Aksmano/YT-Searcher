import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { searchQueryState } from "../../services/types";

export interface searchBarState {
  isSearching: boolean;
  searchToggler: boolean;
  newSearchQuery: searchQueryState;
}

const initialState: searchBarState = {
  isSearching: false,
  searchToggler: false,
  newSearchQuery: {
    part: ["snippet"],
    q: "",
    type: ["video"],
    maxResults: "50",
  },
};

export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    toggleSearch: (state) => {
      state.searchToggler = !state.searchToggler;
    },
    setOn: (state) => {
      state.isSearching = true;
    },
    setOff: (state) => {
      state.isSearching = false;
    },
    setButtonState: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    setNewSearchQuery: (state, action: PayloadAction<searchQueryState>) => {
      state.newSearchQuery = { ...action.payload };
    },
    setNewParam: (state, action: PayloadAction<searchQueryState>) => {
      state.newSearchQuery = { ...state.newSearchQuery, ...action.payload };
    },
  },
});

export const selectSearchBar = (state: RootState) => state.searchBar;

export const {
  setOn,
  setOff,
  setButtonState,
  toggleSearch,
  setNewSearchQuery,
  setNewParam,
} = searchBarSlice.actions;

export default searchBarSlice.reducer;
