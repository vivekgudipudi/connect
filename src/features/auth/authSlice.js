import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("auth"),
  user: JSON.parse(localStorage.getItem("user")) ?? null,
  token: localStorage.getItem("token") ?? null,
};

export const loginHandler = createAsyncThunk(
  "authentication/loginHandler",
  async ({ cred, navigate, location }, thunkAPI) => {
    try {
      const response = await axios.post(`/api/auth/login`, {
        username: cred.username,
        password: cred.password,
      });
      localStorage.setItem("token", response.data.encodedToken);
      localStorage.setItem("user", JSON.stringify(response.data.foundUser));
      localStorage.setItem("auth", true);
      navigate(location?.state?.from.pathname || "/", { replace: true });
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue("username or password is incorrect");
    }
  }
);
export const signupHandler = createAsyncThunk(
  "authentication/signupHandler",
  async ({ entries, navigate, location }, thunkAPI) => {
    try {
      const response = await axios.post(`/api/auth/signup`, {
        username: entries.username,
        password: entries.password,
        firstname: entries.firstname,
        lastname: entries.lastname,
      });
      localStorage.setItem("token", response.data.encodedToken);
      localStorage.setItem("auth", true);
      navigate(location?.state?.from.pathname || "/", { replace: true });
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue("username or password is incorrect");
    }
  }
);

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    userLogout: (state) => {
      localStorage.clear();
      state.isLoggedIn = null;
      state.user = null;
      state.token = null
    },
  },
  extraReducers: {
    [loginHandler.pending]: (state) => {
      state.isLoggedIn = false;
    },
    [loginHandler.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.foundUser;
      state.token = action.payload.encodedToken;
    },
    [loginHandler.rejected]: (state) => {
      state.isLoggedIn = false;
    },
    [signupHandler.pending]: (state) => {
      state.isLoggedIn = false;
    },
    [signupHandler.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.encodedToken;
    },
    [signupHandler.rejected]: (state) => {
      state.isLoggedIn = false;
    },
  },
});
export const { userLogout } = authSlice.actions;
const authReducer = authSlice.reducer;
export { authReducer };
