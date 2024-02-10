
import global from "../../globalVars";
import DeleteNotificationButton
    from "./DeleteNotificationButton";

export default function FollowNotificationsList({notifications, setFollowNotificationsList, setAmountNotifications}) {

    const loopItems = [];
    for (const notification of notifications) {

        // the profile picture
        const profilePicture =<img src={`${global.backend}/static/images/${notification.imagePath}`}/>

        // simple paragraph
        const p = <p>started following you</p>

        // set the date
        const date = <p>{notification.date}</p>
        const followContainer = <div>
            <a href={`${global.backend}/user/${notification.senderUsername}`} >{notification.senderUsername}</a>
            {profilePicture}
            {p}
            {date}
            <DeleteNotificationButton notification={notification} notificationType={'follow'}
                                      setList={setFollowNotificationsList}
                                      keyToBeRemoved={notification.senderUsername}
                                      setAmountNotifications={setAmountNotifications} />
        </div>

        // update the items

        loopItems.push(<li key={notification.senderUsername} >{followContainer}</li>);
    } // end for loop

    // once the loop is completed
    return <ul>
        {loopItems}
    </ul>
} // end of FollowNotificationsList component