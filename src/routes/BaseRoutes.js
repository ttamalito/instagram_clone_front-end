import React from "react";
import {Route, Routes} from "react-router-dom";


import Home from '../pages/Home'

export default function BaseRoutes() {

    return (<Routes>
        <Route exact path='/home' element={<Home />}/>

    </Routes>);
}