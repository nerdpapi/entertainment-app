import { createSlice } from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: { items: [] },
  reducers: {
    setBookmarks: (state, action) => {
      state.items = action.payload;
    },
    addBookmark: (state, action) => {
        const exists = state.items.find(
          (item) => item.tmdbId === action.payload.tmdbId
        );
        if (!exists) {
          state.items.push(action.payload);
        }
      },
    removeBookmark: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { setBookmarks, addBookmark, removeBookmark } =
  bookmarkSlice.actions;

export default bookmarkSlice.reducer;
