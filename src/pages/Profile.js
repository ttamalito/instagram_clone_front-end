
import RequestedToFollow
    from "../components/profileComponents/RequestedToFollow";
import RequestToFollow
    from "../components/profileComponents/RequestToFollow";
import UnFollowUser
    from "../components/profileComponents/UnFollowUser";
import FollowersAndFollowing
    from "../components/profileComponents/FollowersAndFollowing";

import Post from "../components/Post";

/**
 * Creates the Profile Page
 * @return {JSX.Element}
 * @constructor
 */
export default function Profile() {
    const username = 'Dummy_username'
    // fetch the user bio
    const userBioFetched = 'This is supposed to be fetched';
    // fetch all the posts
    const posts = [];

    const following = true;
    const ownProfile = true;
    const requestedToFollow = false;
    const publicProfile = false;

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
    const profilePicture = <img src={'/'} alt={'This is supposed to be the profile pic'}/>
    const bio = <div id={'profile-bio'}>
        <h3>Bio of {username}</h3>
        <p>{userBioFetched}</p>
    </div>

    const metaDataProfile = <div id={'meta-data-profile-div'}>
        {usernameHeader}
        {profilePicture}
        {bio}
    </div>

    // set up the data that should be rendered if the client has access to the profile
    const profileData = <div id={'profile-data'}>
        <a href={'/stories/user'}>View Stories</a>
        {ownProfile && <a href={`/user/edit/`}>Edit Profile</a> }
        {<FollowersAndFollowing />}
        <h3>Posts of {username}</h3>
    </div>


    return (<>
        {metaDataProfile}
        {(following || ownProfile || publicProfile) && profileData}
        <ul className={'posts-list'}>
            {posts.map((post)=> {
                return <li key={post._id} className={'post-list-item'}>
                    <Post postId={post._id} commentCount={post.commentCount} likeCount={post.likeCount}
                          caption={post.caption} likeValue={post.likeValue} postFileName={post.fileName}
                          postOwner={post.username} postType={post.postType} />
                </li>
            })}
        </ul>
    </>);

}