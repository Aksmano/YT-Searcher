import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  extendedSnippet,
  ListComponent,
  searchQueryState,
} from "../../services/types";

export interface ListSearchResultState extends ListComponent {
  prevQ: string;
  isSearching: boolean;
  searchQuery: searchQueryState;
}

const initialState: ListSearchResultState = {
  fetchedInfo: [],
  currentPage: 0,
  prevKind: "",
  prevQ: "",
  isSearching: false,
  toggler: false,
  searchQuery: {
    part: ["snippet"],
    q: "",
    maxResults: "50",
  },
};

export const ListSearchResultSlice = createSlice({
  name: "ListSearchResult",
  initialState,
  reducers: {
    setFechtedInfo: (state, action: PayloadAction<extendedSnippet[]>) => {
      const newfetchedInfo = action.payload.map((item) => {
        return item;
      });
      state.fetchedInfo = [...newfetchedInfo];
    },
    setSRCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<searchQueryState>) => {
      state.searchQuery = { ...action.payload };
    },
    setPrevKind: (state, action: PayloadAction<string>) => {
      state.prevKind = action.payload;
    },
    setPrevQ: (state, action: PayloadAction<string>) => {
      state.prevQ = action.payload;
    },
    toggleLoad: (state) => {
      state.toggler = !state.toggler;
    },
    setSearchOn: (state) => {
      state.isSearching = true;
    },
    setSearchOff: (state) => {
      state.isSearching = false;
    },
  },
});

export const selectListSearchResult = (state: RootState) =>
  state.ListSearchResult;

export const {
  setFechtedInfo,
  setSRCurrentPage,
  setSearchQuery,
  setPrevKind,
  setPrevQ,
  toggleLoad,
  setSearchOn,
  setSearchOff,
} = ListSearchResultSlice.actions;

export default ListSearchResultSlice.reducer;
