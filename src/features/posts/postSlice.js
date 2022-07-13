import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    postsLoader : 'idle',
    users:[]
}

export const getPosts = createAsyncThunk('posts/getPosts',async ()=>{
    try{
        const response = await axios.get('/api/posts');
        return response.data
    }
    catch(error){
        console.log(error.response)
    }
})

export const createPost = createAsyncThunk("posts/createPost", async ({ token, data }) => {
    const postData = data;
    try {
        const response = await axios.post("/api/posts", { postData },{
            headers: {
                authorization: token,
            }
        })
        console.log(response.data)
        return response.data;

    } catch (error) {
        console.error(error)
    }
})

export const addLiked = createAsyncThunk("posts/addLiked",async({token,data})=>{
    try{ 
        const response = await axios.post(`/api/posts/like/${data._id}`,{},{
            headers: { authorization: token }
        })
        console.log(response.data)
        return response.data
    }
    catch(error){
        console.log(error.response)
    }
})

export const removeLiked = createAsyncThunk("posts/removeLiked",async({token,data})=>{
    try{ 
        const response = await axios.post(`/api/posts/dislike/${data._id}`,{},{
            headers: { authorization: token }
        })
        console.log(response.data)
        return response.data
    }
    catch(error){
        console.log(error.response)
    }
})


export const getAllUsers = createAsyncThunk("posts/getAllUsers",async()=>{
    try{
        const response = await axios.get('/api/users');
        return response.data
    }
    catch(error){
        console.log(error.response)
    }
})

const postsSlice = createSlice({
    name : 'posts',
    initialState,
    reducers : {

    },
    extraReducers : {
        [getPosts.pending] : (state)=>{
            state.postsLoader = true;
        },
        [getPosts.fulfilled] : (state,action)=>{
            state.posts = action.payload.posts;
            state.postsLoader = false;
        },
        [addLiked.fulfilled] : (state,action)=>{
            state.posts = action.payload.posts;
        },
        [removeLiked.fulfilled] : (state,action)=>{
            state.posts = action.payload.posts;
        },
        [createPost.fulfilled] : (state,action)=>{
            state.posts = action.payload.posts;
        },
        [getAllUsers.fulfilled] : (state,action)=>{
            state.users = action.payload.users;
            console.log(state.users)
        }
    }
})
const postsReducer = postsSlice.reducer
export { postsReducer };