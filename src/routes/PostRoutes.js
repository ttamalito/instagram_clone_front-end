import React from "react";
import {Route, Routes} from "react-router-dom";



import CreatePost
    from "../pages/posts/CreatePost";

/**
 * Routes regarding all the posts
 * @return {Element}
 * @constructor
 */
export default function PostRoutes() {

    return (<Routes>
        <Route exact path='/createPost' element={<CreatePost />}/>

    </Routes>);
}