import React from "react";
import {Route, Routes} from "react-router-dom";


import Home from '../pages/Home'
export default function BaseRoutes({loggedIn, username}) {

    return (<Routes>
        <Route exact path='/' element={<Home loggedIn={loggedIn} username={username} />}/>

    </Routes>);
}