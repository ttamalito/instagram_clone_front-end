
import global from "../../globalVars";
import catchFetchError
    from "../../utils/catchFetchError";

/**
 * Component that holds the button to unfollow a user
 * @return {JSX.Element}
 * @constructor
 */
export default function UnFollowUser({username, setFollowing}) {

    // define the function to unfollow a user
    const onClickUnfollow = () => {
        // make the PUT request
        fetch(`${global.backend}/user/unfollow/${username}`, {
            method: 'PUT',
            credentials: 'include'
        }).then(unfollowResponse => {
            // get the data to see if the operation was successful
            unfollowResponse.json().then(unfollowData => {
                // check if the operation was completed
                if (unfollowData.result) {
                    // successful
                    // change the following status
                    setFollowing(false);
                } else {
                    // not possible to unfollow
                    window.location.href = unfollowData.url;
                }
            }) // end of json().then()
        }).catch(catchFetchError) // if the request fails
    } // end of onClickUnfollow

    return (<button id={'unfollow-user-button'} onClick={onClickUnfollow} >Unfollow User</button>)
}


