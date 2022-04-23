import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface searchBarState {
  isClicked: boolean;
}

const initialState: searchBarState = {
  isClicked: false,
};

export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    setOn: (state) => {
      state.isClicked = true;
    },
    setOff: (state) => {
      state.isClicked = false;
    },
  },
});

export const selectsearchBar = (state: RootState) => state.searchBar;

export const { setOn, setOff } = searchBarSlice.actions;

export default searchBarSlice.reducer;
