import React from "react";
import {Route, Routes} from "react-router-dom";



import CreatePost
    from "../pages/posts/CreatePost";
import Post from "../components/Post";
import SinglePost
    from "../components/postComponents/SinglePost";

/**
 * Routes regarding all the posts
 * @return {Element}
 * @constructor
 */
export default function PostRoutes() {

    return (<Routes>
        <Route exact path='/createPost' element={<CreatePost />}/>
        <Route exact path={'/post/:id'} element={<SinglePost />} />

    </Routes>);
}