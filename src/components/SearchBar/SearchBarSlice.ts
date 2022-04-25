import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface searchBarState {
  isSearching: boolean;
  searchToggler: boolean;
}

const initialState: searchBarState = {
  isSearching: false,
  searchToggler: false,
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
  },
});

export const selectSearchBar = (state: RootState) => state.searchBar;

export const { setOn, setOff, setButtonState, toggleSearch } =
  searchBarSlice.actions;

export default searchBarSlice.reducer;
