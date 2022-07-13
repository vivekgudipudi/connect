import { Routes, Route } from "react-router-dom";
import { Bookmark } from "../features/bookmark/bookmark";
import { Home } from "../features/posts/home";
import { Login } from "../features/auth/login";
import { Profile } from "../features/profile/profile";
import { Signup } from '../features/auth/signup';
import { RequiresAuth } from "../require-auth";

export const Navigation = ()=>{
    return(
        <Routes>
            <Route path = '/' element = {
            <RequiresAuth>
            <Home/>
            </RequiresAuth>
            }/>
            <Route path = '/bookmarks' element = {
                <RequiresAuth>
                    <Bookmark/>
                </RequiresAuth>
            }/>
            <Route path = '/profile:username' element = {
                <RequiresAuth>
                    <Profile/>
                </RequiresAuth>
            }/>
            <Route path = '/login' element = {<Login/>}/>
            <Route path = '/signup' element = {<Signup/>}/>
            
        </Routes>
    )
}