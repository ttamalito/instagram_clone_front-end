import global from "../../globalVars";
import FollowRequestNotificationsList
    from "../../components/homeComponents/FollowRequestNotificationsList";
import catchFetchError from "../catchFetchError";
import FollowNotificationsList
    from "../../components/homeComponents/FollowNotificationsList";


export default function fetchFollowNotifications(setFollowNotificationsList, setAmountNotifications) {
    fetch(`${global.backend}/fetchFollowNotifications`, // this is the userId
        {
            method: 'GET',
            credentials: 'include'
        }).then(responseFollow => {
        // get the data
        responseFollow.json().then(dataFollow => {
            // check if the result is true
            if (dataFollow.result) {
                // render the list
                const notifications = dataFollow.notifications;
                const list =
                    <FollowNotificationsList
                        notifications={notifications}
                        setFollowNotificationsList={setFollowNotificationsList}
                        setAmountNotifications={setAmountNotifications} />

                setFollowNotificationsList(list);
            } else {
                console.log(`The list could not be retrieved`)
            }
        })
    }).catch(catchFetchError);
} // end of function