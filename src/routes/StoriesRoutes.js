import React from "react";
import {Route, Routes} from "react-router-dom";


import CreateStory
    from "../pages/stories/CreateStory";
export default function StoriesRoutes() {

    return (<Routes>
        <Route exact path='/createStory' element={<CreateStory />}/>

    </Routes>);
}