import React from "react";
import {Route, Routes} from "react-router-dom";


import CreateStory
    from "../pages/stories/CreateStory";
import Story from "../pages/stories/Story";
export default function StoriesRoutes() {

    return (<Routes>
        <Route exact path='/createStory' element={<CreateStory />}/>
        <Route exact path={'/stories/:username/:filename/:sequence'} element={<Story />} />

    </Routes>);
}