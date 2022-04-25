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
  maxResults: "50",
};

let isAlreadyIn: boolean;
// let isAlreadyOut: boolean;

export const videoQuerySlice = createSlice({
  name: "videoQuery",
  initialState,
  reducers: {
    addVideoPart: (state, action: PayloadAction<string>) => {
      isAlreadyIn =
        state.part.find((item) => action.payload === item) === action.payload;
      if (!isAlreadyIn) state.part.push(action.payload);
    },
    delVideoPart: (state, action: PayloadAction<string>) => {
      state.part = state.part.filter((value, index, arr) => {
        return value !== action.payload;
      });
    },
    addVideoId: (state, action: PayloadAction<string>) => {
      isAlreadyIn =
        state.id.find((item) => action.payload === item) === action.payload;
      if (isAlreadyIn) state.id.push(action.payload);
    },
    delVideoId: (state, action: PayloadAction<string>) => {
      state.id = state.id.filter((value, index, arr) => {
        return value !== action.payload;
      });
    },
    setVideoPageToken: (state, action: PayloadAction<string>) => {
      state.pageToken = action.payload;
    },
  },
});

export const selectVideoQuery = (state: RootState) => state.videoQuery;

export const {
  addVideoPart,
  delVideoPart,
  addVideoId,
  delVideoId,
  setVideoPageToken,
} = videoQuerySlice.actions;

export default videoQuerySlice.reducer;
