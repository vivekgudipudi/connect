import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarks: [],
  bookmarksLoader: "idle",
};

export const getBookmarks = createAsyncThunk(
  "bookmarks/getBookmarks",
  async ({ token }) => {
    try {
      const response = await axios.get("/api/users/bookmark/", {
        headers: { authorization: token },
      });
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const addBookmark = createAsyncThunk(
  "bookmarks/addBookmark",
  async ({ token, data }) => {
    try {
      const response = await axios.post(
        `/api/users/bookmark/${data._id}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const removeBookmark = createAsyncThunk(
  "bookmarks/removeBookmark",
  async ({ token, data }) => {
    try {
      const response = await axios.post(
        `/api/users/remove-bookmark/${data._id}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {},
  extraReducers: {
    [getBookmarks.pending]: (state) => {
      state.bookmarksLoader = true;
    },
    [getBookmarks.fulfilled]: (state, action) => {
      state.bookmarks = action.payload.bookmarks;
      state.bookmarksLoader = false;
    },
    [addBookmark.fulfilled]: (state, action) => {
      state.bookmarks = action.payload.bookmarks;
    },
    [removeBookmark.fulfilled]: (state, action) => {
      state.bookmarks = action.payload.bookmarks;
    },
  },
});

const bookmarksReducer = bookmarkSlice.reducer;
export { bookmarksReducer };
