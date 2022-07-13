import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/authSlice";
import { bookmarksReducer } from "./features/bookmark/bookmarkSlice";
import { postsReducer } from "./features/posts/postSlice";


const store = configureStore({
    reducer : {
        auth : authReducer,
        posts : postsReducer,
        bookmarks : bookmarksReducer
    }
})

export default store;