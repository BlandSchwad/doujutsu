import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { mangaApi } from "../services/mangaserver";

export const store = configureStore({
  reducer: {
    [mangaApi.reducerPath]: mangaApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mangaApi.middleware),
});
