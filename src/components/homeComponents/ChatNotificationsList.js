import global from "../../globalVars";
import DeleteNotificationButton
    from "./DeleteNotificationButton";

/**
 * Component that contains the list of all chat notifications
 * @param {Object} notifications
 * @param {Function} setChatNotificationsList
 * @param {Function} setAmountNotifications
 * @return {JSX.Element}
 * @constructor
 */
export default function ChatNotificationsList({notifications, setChatNotificationsList, setAmountNotifications}) {
    const loopItems = [];
    for (const notification of notifications) {


        // simple paragraph
        const paragraph = <p>sent you a message</p>


        // set the date
        const date = <p>{notification.date}</p>

        const chatContainer = <div>
            <a href={`${global.backend}/user/${notification.messageFromUsername}`} >{notification.messageFromUsername}</a>
            {paragraph}
            {date}
            <DeleteNotificationButton notification={notification} notificationType={'chat'}
                                      setList={setChatNotificationsList}
                                      keyToBeRemoved={notification.messageFromUsername}
                                      setAmountNotifications={setAmountNotifications} />
        </div>

        // update the items

        loopItems.push(<li key={notification.messageFromUsername} >{chatContainer}</li>);
    } // end for loop

    // once the loop is completed
    return <ul>
        {loopItems}
    </ul>
} // end of the component