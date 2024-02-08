import {Route, Routes} from "react-router-dom";


import Profile from "../pages/Profile";

export default function ProfileRoutes() {

    return (<Routes>
        <Route exact path='/user/:username' element={<Profile displayFollowersList={false} displayFollowingList={false}/>}/>
        <Route exact path='/user/:username/followers' element={<Profile displayFollowersList={true}  displayFollowingList={false}/> }/>
        <Route exact path='/user/:username/following' element={<Profile displayFollowersList={false} displayFollowingList={true} /> } />
    </Routes>);
}