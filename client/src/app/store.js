import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import movieReducer from "../features/movies/movieSlice";
import bookmarkReducer from "../features/bookmarks/bookmarkSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    bookmarks: bookmarkReducer,
  },
});
