import global from "../../globalVars";
import catchFetchError from "../catchFetchError";
import LikeNotificationsList
    from "../../components/homeComponents/LikeNotificationsList";

/**
 * Fetches all the like notifications from the backend and passes
 * the data to the respective component
 * @param setLikeNotificationsList
 * @param setAmountNotifications
 */
export default function fetchLikeNotifications(setLikeNotificationsList, setAmountNotifications) {
    fetch(`${global.backend}/fetchLikesNotifications`,
        {
            method: 'GET',
            credentials: 'include'
        }).then(responseLike => {
        // get the data
        responseLike.json().then(dataLike => {
            // check if the result is true
            if (dataLike.result) {
                // render the list
                const notifications = dataLike.notifications;
                const list =
                    <LikeNotificationsList
                        notifications={notifications}
                        setLikeNotificationsList={setLikeNotificationsList}
                        setAmountNotifications={setAmountNotifications} />

                setLikeNotificationsList(list);
            } else {
                // redirect
                window.location.href = dataLike.url;
                console.log(`The list could not be retrieved`)
            }
        })
    }).catch(catchFetchError);
} // end fo function