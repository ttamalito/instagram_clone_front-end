import global from "../../globalVars";
import LikeNotificationsList
    from "../../components/homeComponents/LikeNotificationsList";
import catchFetchError from "../catchFetchError";
import CommentNotificationsList
    from "../../components/homeComponents/CommentNotificationsList";

/**
 * Fetches all the comment notification and populates the respective list
 * @param {Function} setCommentNotificationsList
 * @param {Function} setAmountNotifications
 */
export default function fetchCommentNotifications(setCommentNotificationsList, setAmountNotifications) {
    fetch(`${global.backend}/fetchCommentNotifications`,
        {
            method: 'GET',
            credentials: 'include'
        }).then(responseComment => {
        // get the data
        responseComment.json().then(dataComment => {
            // check if the result is true
            if (dataComment.result) {
                // render the list
                const notifications = dataComment.notifications;
                const list =
                    <CommentNotificationsList
                        notifications={notifications}
                        setCommentNotificationsList={setCommentNotificationsList}
                        setAmountNotifications={setAmountNotifications} />

                setCommentNotificationsList(list);
            } else {
                // redirect
                window.location.href = dataComment.url;
                console.log(`The list could not be retrieved`)
            }
        })
    }).catch(catchFetchError);
} // end of function