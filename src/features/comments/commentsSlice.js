import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
};

export const getComments = createAsyncThunk(
  "comments/getComments",
  async ({ data }) => {
    try {
      const response = await axios.get(`/api/comments/${data._id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ token, postID, data }) => {
    const commentData = data;
    try {
      const response = await axios.post(
        `/api/comments/add/${postID}`,
        { commentData },
        {
          headers: { authorization: token },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ token, postID, commentID }) => {
    try {
      const response = await axios.delete(
        `/api/comments/delete/${postID}/${commentID}`,
        {
          headers: { authorization: token },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editComment = createAsyncThunk(
  "comments/editComment",
  async ({ token, postID, commentID, newContent }) => {
    const commentData = newContent;
    try {
      const response = await axios.post(
        `/api/comments/edit/${postID}/${commentID}`,
        { commentData },
        {
          headers: { authorization: token },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [getComments.fulfilled]: (state, action) => {
      state.comments = action.payload.comments;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.comments = action.payload.comments;
    },
    [editComment.fulfilled]: (state, action) => {
      state.comments = action.payload.comments;
    },
    [addComment.fulfilled]: (state, action) => {
      state.comments = action.payload.comments;
    },
  },
});

const commentsReducer = commentsSlice.reducer;
export { commentsReducer };
