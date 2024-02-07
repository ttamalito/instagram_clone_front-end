
import global from "../../globalVars";
import catchFetchError
    from "../../utils/catchFetchError";


/**
 * Component that holds the button to follow a user
 * @return {JSX.Element}
 * @constructor
 */
export default function RequestToFollow({setFollowing, setRequestedToFollow, username}) {


    // define the function to make the put request
    const onClickFollow = () => {
        fetch(`${global.backend}/user/follow/${username}`, {
            method: 'PUT',
            credentials: 'include'
        }).then(async followResponse => {
            // the request was successful
            // get the data
            const followData  = await followResponse.json();
            // check if the operation was successful
            if (followData.result) {
                // successful
                // check if following is true(i.e., if the profile was private)
                if (followData.following) {
                    // following should be set to true
                    setFollowing(true);
                } else {
                    // the profile is private, and a request was sent
                    setRequestedToFollow(true);
                }
            } else {
                // the operation could not be performed, redirect is needed
                window.location.href = followData.url;
            }
        }).catch(catchFetchError);
    }



    return (<button id={'follow-user-button'} onClick={onClickFollow}>Follow User </button>)
} // end of the component