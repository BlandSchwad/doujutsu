import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { mangaApi } from "../services/mangaserver";
import modalReducer from "../features/modals/modalSlice";

export const store = configureStore({
  reducer: {
    [mangaApi.reducerPath]: mangaApi.reducer,
    modal: modalReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mangaApi.middleware),
});
