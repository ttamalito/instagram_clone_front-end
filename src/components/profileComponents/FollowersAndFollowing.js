/**
 * Creates the necessary Elements for displaying and closing the followers and following
 * @return {JSX.Element}
 * @constructor
 */
export default function FollowersAndFollowing() {

    // display followers
    const displayFollowersButton = <button id="display-followers-button">Followers</button>;
    const closeFollowersButton =  <button id="close-followers-button">Close Followers</button>;
    const followers = <div id="followers-div" >
        <ul id="followers-list"></ul>
    </div>;

    const followersWrapper = <div className={'followers-following'}>
        {displayFollowersButton}
        {closeFollowersButton}
        {followers}
    </div>

    // following
    const displayFollowingButton = <button id="display-following-button">Following</button>
    const closeFollowingButton = <button id="close-following-button">Close Following</button>;
    const following =  <div id="following-div" >
        <ul id="following-list"></ul>
    </div>

    const followingWrapper = <div className={'followers-following'}>
        {displayFollowingButton}
        {closeFollowingButton}
        {following}
    </div>

    return (<>
        {followersWrapper}
        {followingWrapper}
    </>)
}