
// import some components
import FollowersList from "./FollowersList";

import global from "../../globalVars";
import catchFetchError
    from "../../utils/catchFetchError";
import {useState} from "react";

import '../../styles/profileStyles/followersFollowingList.css'


/**
 * Creates the necessary Elements for displaying and closing the followers and following
 * @return {JSX.Element}
 * @constructor
 */
export default function FollowersAndFollowing({username, displayFollowersList, displayFollowingList}) {
    // set the state variables
    const [followersList, setFollowersList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    // fetch the followers if necessary
    if (displayFollowersList) {
        fetchFollowers(username, setFollowersList);
    }
    // fetch the following list if necessary
    if (displayFollowingList) {
        fetchFollowing(username, setFollowingList);
    }
    // display followers
    const displayFollowersButton = <a id="display-followers-button" href={`/user/${username}/followers`}>Followers</a>;


    const followersWrapper = <div className={'followers-following'}>
        {displayFollowersButton}
        {displayFollowersList && <FollowersList username={username} followersList={followersList} /> }
    </div>

    // following
    const displayFollowingButton = <a id="display-following-button" href={`/user/${username}/following`}>Following</a>
    const following =  <div className={"followers-following-div"} >
        <div className={'follower-following-header'}>
            <h4 className={'follow-title'}>Following</h4>
            <a className={"close-followers-following-anchor"} href={`/user/${username}`}>Close Following</a>
        </div>
            <ul className={"followers-following-list"}>
            {
                followingList.map(follow => {
                    return <li key={follow} >{follow}</li>
                })
            }
        </ul>
    </div>

    const followingWrapper = <div className={'followers-following'}>
        {displayFollowingButton}
        {displayFollowingList &&  following}
    </div>

    return (<>
        {followersWrapper}
        {followingWrapper}
    </>)
} // end of the component


/**
 * Handler to fetch the followers when the button is clicked
 */
function fetchFollowers(username, setFollowersList) {
    // fetch the followers
    fetch(`${global.backend}/user/${username}/followers`, {
        method: 'GET',
        credentials: 'include'
    }).then(async followersResponse => {
        // get the data from the response
        const followersData = await followersResponse.json();
        // check if the operation was performed
        if (followersData.result) {
            // successful
            setFollowersList(followersData.followers);
        } else {
            // operation could not be performed
            // redirect
            window.location.href = followersData.url;
        }
    }).catch(catchFetchError);
} // end of onClickFetchFollowers


/**
 * Fetches the following list for the user
 * @param {String} username
 * @param {Function} setFollowingList
 */
function fetchFollowing(username, setFollowingList) {
    // fetch the following list
    fetch(`${global.backend}/user/${username}/following`, {
        method: 'GET',
        credentials: 'include'
    }).then(async followingResponse => {
        // get the data from the response
        const followingData = await followingResponse.json();
        // check if the operation was performed
        if (followingData.result) {
            // successful
            setFollowingList(followingData.following);
        } else {
            // operation could not be performed
            // redirect
            window.location.href = followingData.url;
        }
    }).catch(catchFetchError);
}


