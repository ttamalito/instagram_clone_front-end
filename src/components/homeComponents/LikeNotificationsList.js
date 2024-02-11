import global from "../../globalVars";
import DeleteNotificationButton
    from "./DeleteNotificationButton";

/**
 * Creates the list with the necessary data
 * @param {[Object]} notifications
 * @param {Function} setLikeNotificationsList
 * @param {Function} setAmountNotifications
 * @return {JSX.Element}
 * @constructor
 */
export default function LikeNotificationsList({notifications, setLikeNotificationsList, setAmountNotifications}) {

    const loopItems = [];
    for (const notification of notifications) {


        // simple paragraph
        const paragraph = <p>liked your post</p>


        // the image
        const image = <img src={`${global.backend}/static/images/${notification.imagePath}`} />

        // set the date
        const date = <p>{notification.date}</p>

        const likeContainer = <div>
            <a href={`${global.backend}/user/${notification.senderUsername}`} >{notification.senderUsername}</a>
            {paragraph}
            {image}
            {date}
            <DeleteNotificationButton notification={notification} notificationType={'like'}
                                      setList={setLikeNotificationsList}
                                      keyToBeRemoved={notification.senderUsername}
                                      setAmountNotifications={setAmountNotifications} />
        </div>

        // update the items

        loopItems.push(<li key={notification.senderUsername} >{likeContainer}</li>);
    } // end for loop

    // once the loop is completed
    return <ul>
        {loopItems}
    </ul>
} // end of component