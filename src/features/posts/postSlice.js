import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  postsLoader: "idle",
  users: [],
  followingData: [],
  singleUser: null,
  profileLoader: "idle",
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    const response = await axios.get("/api/posts");
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ token, data }) => {
    const postData = data;
    try {
      const response = await axios.post(
        "/api/posts",
        { postData },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ token, data }) => {
    try {
      const response = await axios.delete(`/api/posts/${data._id}`, {
        headers: { authorization: token },
      });
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ token, data, newContent }) => {
    const postData = newContent;
    try {
      const response = await axios.post(
        `/api/posts/edit/${data._id}`,
        { postData },
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

export const addLiked = createAsyncThunk(
  "posts/addLiked",
  async ({ token, data }) => {
    try {
      const response = await axios.post(
        `/api/posts/like/${data._id}`,
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

export const removeLiked = createAsyncThunk(
  "posts/removeLiked",
  async ({ token, data }) => {
    try {
      const response = await axios.post(
        `/api/posts/dislike/${data._id}`,
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

export const getAllUsers = createAsyncThunk("posts/getAllUsers", async () => {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
});

export const getUser = createAsyncThunk("posts/getUser", async (userID) => {
  try {
    const response = await axios.get(`/api/users/${userID}`);
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
});
export const addFollow = createAsyncThunk(
  "posts/addFollow",
  async ({ token, followID }) => {
    try {
      const response = await axios.post(
        `/api/users/follow/${followID}`,
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

export const removeFollow = createAsyncThunk(
  "posts/addFollow",
  async ({ token, followID }) => {
    try {
      const response = await axios.post(
        `/api/users/unfollow/${followID}`,
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

export const editProfile = createAsyncThunk(
  "posts/editProfile",
  async ({ token, data }) => {
    const userData = data;
    try {
      const response = await axios.post(
        "/api/users/edit",
        { userData },
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

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.postsLoader = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.postsLoader = false;
    },
    [addLiked.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
    },
    [removeLiked.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
    },
    [createPost.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload.users;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
    },
    [editPost.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
    },
    [addFollow.fulfilled]: (state, action) => {
      const { user, followUser } = action.payload;
      state.users = state.users.map((curr) =>
        curr.username === user.username ? user : curr
      );
      state.users = state.users.map((curr) =>
        curr.username === followUser.username ? followUser : curr
      );
      state.singleUser = action.payload.followUser;
    },
    [removeFollow.fulfilled]: (state, action) => {
      const { user, followUser } = action.payload;
      state.users = state.users.map((curr) =>
        curr.username === user.username ? user : curr
      );
      state.users = state.users.map((curr) =>
        curr.username === followUser.username ? followUser : curr
      );
      state.singleUser = action.payload.followUser;
    },
    [editProfile.fulfilled]: (state, action) => {
      state.users = state.users.map((user) =>
        user.username === action.payload.username ? action.payload : user
      );
      state.singleUser = action.payload;
    },
    [getUser.fulfilled]: (state, action) => {
      state.singleUser = action.payload?.user;
    },
  },
});
const postsReducer = postsSlice.reducer;
export { postsReducer };
