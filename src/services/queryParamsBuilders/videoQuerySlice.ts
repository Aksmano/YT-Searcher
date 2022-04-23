import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface videoQueryState {
  // required
  part: string[];

  // filters (must be at least one active)
  chart: string; // acceptable states: mostPopular
  id: string[];
  myRating?: string; // OAuth only

  // optional
  h1?: string;
  maxHeight?: string;
  maxWidth?: string;
  onBehalfOfContentOwner?: string; // OAuth
  maxResults?: string; // 0-50 range
  pageToken?: string;
  regionCode?: string;
  videoCategoryId?: string;
}

const initialState: videoQueryState = {
  part: ["snippet", "contentDetails", "statistics"],
  chart: "mostPopular",
  id: [],
  maxResults: "10",
};

let isAlreadyIn: boolean;
// let isAlreadyOut: boolean;

export const videoQuerySlice = createSlice({
  name: "videoQuery",
  initialState,
  reducers: {
    addPart: (state, action: PayloadAction<string>) => {
      isAlreadyIn =
        state.part.find((item) => action.payload === item) === action.payload;
      if (!isAlreadyIn) state.part.push(action.payload);
    },
    delPart: (state, action: PayloadAction<string>) => {
      state.part = state.part.filter((value, index, arr) => {
        return value !== action.payload;
      });
    },
    addId: (state, action: PayloadAction<string>) => {
      isAlreadyIn =
        state.id.find((item) => action.payload === item) === action.payload;
      if (isAlreadyIn) state.id.push(action.payload);
    },
    delId: (state, action: PayloadAction<string>) => {
      state.id = state.id.filter((value, index, arr) => {
        return value !== action.payload;
      });
    },
  },
});

export const selectVideoQuery = (state: RootState) => state.videoQuery;

export const { addPart, delPart, addId, delId } = videoQuerySlice.actions;

export default videoQuerySlice.reducer;
