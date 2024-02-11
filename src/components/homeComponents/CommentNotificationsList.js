import global from "../../globalVars";
import DeleteNotificationButton
    from "./DeleteNotificationButton";

/**
 * Component that holds the list of comment notifications
 * @param {Object} notifications
 * @param {Function} setCommentNotificationsList
 * @param {Function} setAmountNotifications
 * @return {JSX.Element}
 * @constructor
 */
export default function CommentNotificationsList({notifications, setCommentNotificationsList, setAmountNotifications}) {
    const loopItems = [];
    for (const notification of notifications) {


        // simple paragraph
        const paragraph = <p>commented your post</p>


        // the image
        const image = <img src={`${global.backend}/static/images/${notification.imagePath}`} />

        // set the date
        const date = <p>{notification.date}</p>

        const commentContainer = <div>
            <a href={`${global.backend}/user/${notification.senderUsername}`} >{notification.senderUsername}</a>
            {paragraph}
            {image}
            {date}
            <DeleteNotificationButton notification={notification} notificationType={'comment'}
                                      setList={setCommentNotificationsList}
                                      keyToBeRemoved={notification.senderUsername}
                                      setAmountNotifications={setAmountNotifications} />
        </div>

        // update the items

        loopItems.push(<li key={notification.senderUsername} >{commentContainer}</li>);
    } // end for loop

    // once the loop is completed
    return <ul>
        {loopItems}
    </ul>
} // end of component