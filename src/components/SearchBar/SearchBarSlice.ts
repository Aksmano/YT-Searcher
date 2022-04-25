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
    setButtonState: (state, action: PayloadAction<boolean>) => {
      state.isClicked = action.payload;
    },
  },
});

export const selectSearchBar = (state: RootState) => state.searchBar;

export const { setOn, setOff, setButtonState } = searchBarSlice.actions;

export default searchBarSlice.reducer;
