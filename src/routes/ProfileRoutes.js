import {Route, Routes} from "react-router-dom";


import Profile from "../pages/Profile";

export default function ProfileRoutes() {

    return (<Routes>
        <Route exact path='/user/:username' element={<Profile />}/>

    </Routes>);
}