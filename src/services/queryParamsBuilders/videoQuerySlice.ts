import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { videoQueryState } from "../types";

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
      // isAlreadyIn =
      //   state.id.find((item) => action.payload === item) === action.payload;
      // if (isAlreadyIn) state.id.push(action.payload);
      if (state.id!.indexOf(action.payload) === -1)
        state.id!.push(action.payload);
    },
    delVideoId: (state, action: PayloadAction<string>) => {
      state.id = state.id.filter((value, index, arr) => {
        return value !== action.payload;
      });
    },
    emptyVideoIds: (state) => {
      state.id = [];
    },
    setMaxResults: (state, action: PayloadAction<string>) => {
      state.maxResults = action.payload;
    },
    setChart: (state, action: PayloadAction<string>) => {
      state.chart = action.payload;
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
  setMaxResults,
  setChart,
} = videoQuerySlice.actions;

export default videoQuerySlice.reducer;
