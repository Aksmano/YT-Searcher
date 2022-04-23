import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface searchQueryState {
  // required, immutable
  part: string[];

  // filters (0 or 1 filters)
  forContentOwner?: boolean; // OAuth
  forDeveloper?: boolean; // OAuth
  forMine?: boolean; // OAuth
  relatedToVideoId?: string;

  // optional parameters
  channelId?: string;
  channelType?: string;
  eventType?: string;
  location?: string[2]; // latitude, longitude
  locationRadius?: string; // acceptable units - m, km, ft, mi, e.g. 10km
  maxResults?: string; // 0-50 range
  onBehalfOfContentOwner?: string; // OAuth
  order?: string;
  pageToken?: string;
  publishedAfter?: string; // RFC 3339 date-time format(YYYY-MM-DDTHH:MM:SSZ)
  publishedBefore?: string;
  q?: string; // can specify NOT (-, %20 in query) and OR (|, %7C in query) to search more precisely (TODO)
  regionCode?: string;
  relevanceLanguage?: string;
  safeSearch?: string; // acceptable values - moderate, strict, none
  topicId?: string;
  type?: string[]; // acceptable values - channel, playlist, video
  videoCaption?: string; // acceptable values - any, none, closedCaption
  videoCategoryId?: string;
  videoDefinition?: string;
  videoDimension?: string; // acceptable values - 2d, 3d, any
  videoDuration?: string; // acceptable values - short (<4min), medium (>4min and <20min), long(>20min), any
  videoEmbeddable?: string; // acceptable values - true, any
  videoLicense?: string; // acceptable values - youtube, creativeCommon, any
  videoSyndicated?: string; // can be viewed only outside yt, acceptable values - true, any
  videoType?: string; // acceptable values - episode, movie, any
}

const initialState: searchQueryState = {
  part: ["snippet"],
  type: ["video"],
  maxResults: "10",
};

export const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState,
  reducers: {
    addType: (state, action: PayloadAction<string>) => {
      if (state.type!.indexOf(action.payload) === -1)
        state.type!.push(action.payload);
    },
    delType: (state, action: PayloadAction<string>) => {
      state.type = state.type!.filter((value, index, arr) => {
        return value !== action.payload;
      });
    },
    newQueryTerm: (state, action: PayloadAction<string>) => {
      state.q = action.payload;
    },
  },
});

export const selectSearchQuery = (state: RootState) => state.searchQuery;

export const { addType, delType, newQueryTerm } = searchQuerySlice.actions;

export default searchQuerySlice.reducer;
