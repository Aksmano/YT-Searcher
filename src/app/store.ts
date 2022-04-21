import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { apiSlice } from "../services/youtube";
import videoQueryReducer from "../services/queryParamsBuilders/videoQuerySlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    videoQuery: videoQueryReducer,
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
