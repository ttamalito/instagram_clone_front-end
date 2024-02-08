

// import the styles
import '../../styles/profileStyles/followersFollowingList.css';

export default function FollowersList({username, followersList}) {
    const followers = <div className={"followers-following-div"} >
        <div className={'follower-following-header'}>
            <h4 className={'follow-title'}>Followers</h4>
            <a className={"close-followers-following-anchor"} href={`/user/${username}`}>Close Followers</a>
        </div>
        <ul className={"followers-following-list"}>
            {
                followersList.map(follower => {
                    return <li key={follower} >{follower}</li>
                })
            }
        </ul>
    </div>;

    return followers;
}