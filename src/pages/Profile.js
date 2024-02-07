
import RequestedToFollow
    from "../components/profileComponents/RequestedToFollow";
import RequestToFollow
    from "../components/profileComponents/RequestToFollow";
import UnFollowUser
    from "../components/profileComponents/UnFollowUser";
import FollowersAndFollowing
    from "../components/profileComponents/FollowersAndFollowing";

import Post from "../components/Post";


// styles
import '../styles/profileStyles/profile.css';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import catchFetchError
    from "../utils/catchFetchError";

import global from "../globalVars";


/**
 * Creates the Profile Page
 * @return {JSX.Element}
 * @constructor
 */
export default function Profile() {
    const params = useParams();
    const username = params.username;
    // user bio
    const [userBioFetched, setUserBioFetched] = useState('');
    // fetch all the posts
    const [posts, setPosts] = useState([]);

    const [following, setFollowing] = useState(true);
    const [ownProfile, setOwnProfile] = useState(true);
    const [requestedToFollow, setRequestedToFollow] = useState(false);
    const [publicProfile, setPublicProfile] = useState(false);
    const [imagePath, setImagePath] = useState('');

    // declare the useEffect to fetch the user data
    useEffect(() => {
        // fetch the data and populate everything
        fetchProfile(username, setUserBioFetched, setPosts, setFollowing, setOwnProfile, setRequestedToFollow, setPublicProfile, setImagePath);
    }, []);


    // logic to display follow/unfollow or Request Sent/Remove Request
    /*
    If you are not following the user and it is not your profile, then check
    if you have already requested to follow the user.
    If you were already following the user and it is not your own profile, then
    render the button to unfollow the user
     */
    const followUnFollowRequest = (!following && !ownProfile) ?
        ((requestedToFollow)? <RequestedToFollow /> : <RequestToFollow />)
        : ((following && !ownProfile) && <UnFollowUser />);



    const usernameHeader = <h1>{username}</h1>
    const profilePicture = <img src={`${global.backend}${imagePath}`} alt={'This is supposed to be the profile pic'}/>
    const bio = <div id={'profile-bio'}>
        <h3>Bio of {username}</h3>
        <p>{userBioFetched}</p>
    </div>

    const metaDataProfile = <div id={'meta-data-profile-div'}>
        <div id={`profile-picture-and-stories-div`}>
            {profilePicture}
        </div>
        <div id={'username-follow-bio-div'}>
            {usernameHeader}
            {followUnFollowRequest}
            {bio}
        </div>
    </div>

    // set up the data that should be rendered if the client has access to the profile
    const profileData = <div id={'profile-data'}>
        <div id={'profile-links'}>
            <a href={'/stories/user'}>View Stories</a>
            {ownProfile && <a href={`/user/edit/`}>Edit Profile</a> }
        </div>
        {<FollowersAndFollowing />}
        <h3>Posts of {username}</h3>
    </div>


    return (<div id={'main-profile-container'}>
        {metaDataProfile}
        {(following || ownProfile || publicProfile) && profileData}
        <ul className={'posts-list'}>
            {posts.map((post)=> {
                return <li key={post._id} className={'post-list-item'}>
                    <Post postId={post._id} commentCount={post.commentCount} likeCount={post.likeCount}
                          caption={post.caption} likeValue={post.likeValue} postFileName={post.fileName}
                          postOwner={username} postType={post.postType} classStyle={'profile-grid'}/>
                </li>
            })}
        </ul>
    </div>);

} // end of component Profile


/**
 * Fetches the necessary data to render the page accordingly and sets all the values that were declared using useState
 * @param {String} username
 * @param {Function} setUserBioFetched
 * @param {Function} setPosts
 * @param {Function} setFollowing
 * @param {Function} setOwnProfile
 * @param {Function} setRequestedToFollow
 * @param {Function} setPublicProfile
 * @param {Function} setImagePath
 */
function fetchProfile(username, setUserBioFetched, setPosts, setFollowing, setOwnProfile, setRequestedToFollow, setPublicProfile, setImagePath) {
    // crete the get request
    fetch(`${global.backend}/user/${username}`, {
        method: 'GET',
        credentials: 'include'
    }).then(getResponse => {
        // get the data
        getResponse.json().then(getData => {
            // here we have the data of the profile
            // set the bio
            setUserBioFetched(getData.userBio);
            // set the posts
            setPosts(getData.posts);
            // check if the user requesting is following the profile
            setFollowing(getData.following);
            // check if the user is wanting to visit his own profile
            setOwnProfile(getData.ownProfile);
            // check if the user has requested to follow the owner of the profile
            setRequestedToFollow(getData.requestedToFollow);
            // check if the profile that is being rendered is public
            setPublicProfile(getData.publicProfile);
            // set the path to the profile picture
            setImagePath(getData.imagePath);
        })
    }).catch(catchFetchError);
} // end of fetchProfile