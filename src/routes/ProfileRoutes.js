import {Route, Routes} from "react-router-dom";


import Profile from "../pages/Profile";
import EditProfile
    from "../pages/profile/EditProfile";

export default function ProfileRoutes({username, loggedIn}) {

    return (<Routes>
        <Route exact path='/user/:username' element={<Profile displayFollowersList={false} displayFollowingList={false}/>}/>
        <Route exact path='/user/:username/followers' element={<Profile displayFollowersList={true}  displayFollowingList={false}/> }/>
        <Route exact path='/user/:username/following' element={<Profile displayFollowersList={false} displayFollowingList={true} /> } />
        <Route exact path={'/user/edit/:username'} element={<EditProfile username={username} loggedIn={loggedIn} /> } />
    </Routes>);
}