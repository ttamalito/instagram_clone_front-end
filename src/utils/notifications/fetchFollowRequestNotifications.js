
import global from "../../globalVars";
import FollowRequestNotificationsList
    from "../../components/homeComponents/FollowRequestNotificationsList";
import catchFetchError from "../catchFetchError";

/**
 * Fetches the notifications to request to follow
 * and renders the list
 * @returns {Promise<void>}
 */
export default function fetchFollowRequestNotifications(setFollowRequestNotificationsList, setAmountNotifications) {
    fetch(`${global.backend}/fetchFollowRequestNotifications`, // this is the userId
        {
            method: 'GET',
            credentials: 'include'
        }).then(responseRequestToFollow => {
            // get the data
            responseRequestToFollow.json().then(dataRequestToFollow => {
                // check if the result is true
                if (dataRequestToFollow.result) {
                    // render the list
                    const notifications = dataRequestToFollow.requestToFollow;
                    const list =
                        <FollowRequestNotificationsList
                            notifications={notifications}
                            setFollowRequestNotificationsList={setFollowRequestNotificationsList}
                            setAmountNotifications={setAmountNotifications}/>
                    setFollowRequestNotificationsList(list);
                } else {
                    console.log(`The list could not be retrieved`)
                }
            })
    }).catch(catchFetchError);


} // here ends the function