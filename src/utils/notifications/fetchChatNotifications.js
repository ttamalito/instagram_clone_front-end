import global from "../../globalVars";
import CommentNotificationsList
    from "../../components/homeComponents/CommentNotificationsList";
import catchFetchError from "../catchFetchError";
import ChatNotificationsList
    from "../../components/homeComponents/ChatNotificationsList";

/**
 * Fetches all the chat notifications and renders the corresponding list
 * @param {Function} setChatNotificationsList
 * @param {Function} setAmountNotifications
 */
export default function fetchChatNotifications(setChatNotificationsList, setAmountNotifications) {
    fetch(`${global.backend}/fetchChatNotifications`,
        {
            method: 'GET',
            credentials: 'include'
        }).then(responseChat => {
        // get the data
        responseChat.json().then(dataChat => {
            // check if the result is true
            if (dataChat.result) {
                // render the list
                const notifications = dataChat.notifications;
                const list =
                    <ChatNotificationsList
                        notifications={notifications}
                        setChatNotificationsList={setChatNotificationsList}
                        setAmountNotifications={setAmountNotifications} />

                setChatNotificationsList(list);
            } else {
                // redirect
                window.location.href = dataChat.url;
                console.log(`The list could not be retrieved`)
            }
        })
    }).catch(catchFetchError);
} // end of function