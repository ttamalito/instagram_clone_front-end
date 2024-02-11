import catchFetchError
    from "../../utils/catchFetchError";
import changeAmountOfNotifications
    from "../../utils/notifications/changeAmountOfNotifications";

/**
 * Button that holds the listener to send a request to remove a notification
 * @param {Object} notification
 * @param {String} notificationType
 * @param {Function} setList
 * @param {*} keyToBeRemoved
 * @param {Function} setAmountNotifications
 * @return {JSX.Element}
 * @constructor
 */
export default function DeleteNotificationButton({notification, notificationType,
                                                     setList, keyToBeRemoved, setAmountNotifications}) {
    // create the button
    const deleteNotificationButton = <button
    onClick={() => {
        removeNotification(notification, notificationType, setList, keyToBeRemoved, setAmountNotifications)
    }}>Remove notification</button>


    return deleteNotificationButton
}



/**
 * Function that contains the logic to send the PUT request, to remove a notification
 * @param {Object} notification The data for the notification, i.e., an object of key-value pairs
 * @param {String} notificationType
 * @param {Function} setList The setter for the useState of the list
 * @param {*} keyToBeRemoved
 * @param {Function} setAmountNotifications function to change the amount of notifications
 */
function removeNotification(notification, notificationType, setList, keyToBeRemoved, setAmountNotifications) {
    console.log(typeof setAmountNotifications)
    const bodyData = new URLSearchParams(notification);
    fetch(`http://localhost:3000/removeNotification/${notificationType}`, {
        method: 'PUT',
        body: bodyData,
        credentials: 'include'
    }).then(
        async response => {
            // get the data
            const data = await response.json();
            if (data.result) {
                // successful removing the notification
                // change the list
                switch (notificationType) {
                    case 'follow': {
                        setList(prev => {
                            const filtered = prev.props.notifications.filter(notification => {return keyToBeRemoved !== notification.senderUsername});
                            return <ul>{filtered}</ul>
                        })
                    } // end of follow case
                        break;
                    case 'like': {
                        setList(prev => {
                            const filtered = prev.props.notifications.filter(notification => {return keyToBeRemoved !== notification.senderUsername});
                            return <ul>{filtered}</ul>
                        })
                    } // enf of like case
                        break;
                    default:
                        break;
                } // end of switch
                // decrease the amount of notifications
                setAmountNotifications(prev => {
                    return changeAmountOfNotifications(prev, -1);
                })

            } // if data.result
        } // async response end
    ).catch(err => {
        console.error(err);
        console.log(`we got an error here!`)
    });


} // here ends removeNotification