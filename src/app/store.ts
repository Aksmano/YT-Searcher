import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { apiSlice } from "../services/youtube";
import videoQueryReducer from "../services/queryParamsBuilders/videoQuerySlice";
import searchQueryReducer from "../services/queryParamsBuilders/searchQuerySlice";
import searchBarReducer from "../components/SearchBar/SearchBarSlice";
import ListMostPopularReducer from "../components/ListMostPopular/ListMostPopularSlice";
import ListSearchResultReducer from "../components/ListSearchResult/ListSearchResultSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    videoQuery: videoQueryReducer,
    searchQuery: searchQueryReducer,
    searchBar: searchBarReducer,
    ListMostPopular: ListMostPopularReducer,
    ListSearchResult: ListSearchResultReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
