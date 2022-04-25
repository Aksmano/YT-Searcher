import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface searchBarState {
  isSearching: boolean;
}

const initialState: searchBarState = {
  isSearching: false,
};

export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
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

export const { setOn, setOff, setButtonState } = searchBarSlice.actions;

export default searchBarSlice.reducer;
