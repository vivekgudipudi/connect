import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/authSlice";
import { bookmarksReducer } from "./features/bookmark/bookmarkSlice";
import { postsReducer } from "./features/posts/postSlice";
import { commentsReducer } from "./features/comments/commentsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    bookmarks: bookmarksReducer,
    comments: commentsReducer,
  },
});

export default store;
