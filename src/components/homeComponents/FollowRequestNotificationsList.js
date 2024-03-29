

import global from "../../globalVars";
import catchFetchError
    from "../../utils/catchFetchError";
import {useState} from "react";
import changeAmountOfNotifications
    from "../../utils/notifications/changeAmountOfNotifications";

/**
 *
 * @param {[]} notifications
 * @return {{}}
 * @param {Function} setFollowRequestNotificationsList function (useState) to re-render the list
 * @param {Function} setAmountNotifications function to set the text in the notifications button
 * @constructor
 */
export default function FollowRequestNotificationsList({notifications, setFollowRequestNotificationsList,
                                                           setAmountNotifications}) {

    const loopItems = [];
    for (const notification of notifications) {
        const anchor = <a href={`/user/${notification.username}`}>{notification.username}</a>;
        const buttonAccept = <button value={`${notification.username}`} onClick={
            (event) => {
                onClickAcceptFollowRequest(event, setFollowRequestNotificationsList, setAmountNotifications)}
        }>Accept</button>
        const buttonReject = <button  value={`${notification.username}`}
        onClick={(event) => {
            onClickRejectFollowRequest(event, setFollowRequestNotificationsList, setAmountNotifications)
        }}>Reject</button>
        const date = <p>{`at ${notification.date}`}</p>;
        const container = <div className={`follow-request-notification-div`}>
            {anchor}
            {buttonAccept}
            {buttonReject}
            {date}
        </div>
        // update the items

           loopItems.push(<li key={notification.username} id={notification.username}>{container}</li>);
    }
    // once the loop is completed
    return <ul>
        {loopItems}
    </ul>
} // end of component

/**
 * Sends the request to accept the follow
 * Removes the item from the list
 * Changes the text in the notificatios button
 * @param {SyntheticEvent} event
 * @param {Function} setItems
 * @param {Function} setAmountNotifications
 */
function onClickAcceptFollowRequest(event, setItems, setAmountNotifications) {

    const username = event.nativeEvent.srcElement.value;


    // send a request
    fetch(`${global.backend}/user/acceptFollow/${username}`, {
        method: 'GET',
        credentials: 'include'
    }).then(async response => {
        // get the result
        const data = await response.json();
        if (data.result) {
            // operation was successful
            // remove the list item from the list
            setItems(prev => {
                console.log(prev.props.notifications);
                const filtered = prev.props.notifications.filter(notification => {return username !== notification.username});
                console.log(filtered)

                return <ul>{filtered}</ul>
            });
            // increment of decrease the notifications text
            setAmountNotifications(prev => {
                return changeAmountOfNotifications(prev, -1);
            })
        } else {
            // redirect
            window.location.href = data.url;
        }
    }).catch(catchFetchError)



} // end of handler


/**
 * Sends the request to reject a user changes the list and the notifications button
 * @param {SyntheticEvent} event
 * @param {Function} setFollowRequestNotificationsList
 * @param {Function} setAmountNotifications
 */
function onClickRejectFollowRequest(event, setFollowRequestNotificationsList, setAmountNotifications) {
    // retrieve the username
    const username = event.nativeEvent.srcElement.value;

    // send a request
    fetch(`${global.backend}/user/rejectFollow/${username}`, {
        method: 'GET',
        credentials: 'include'
    }).then(async response => {
        // get the result
        const data = await response.json();
        if (data.result) {
            // operation was successful
            // remove the list item from the list
            setFollowRequestNotificationsList(prev => {
                // remove the user
                const filtered = prev.props.notifications.filter(notification => {return username !== notification.username});
                return <ul>{filtered}</ul>
            });
            // increment of decrease the notifications text
            setAmountNotifications(prev => {
                return changeAmountOfNotifications(prev, -1);
            });
        } else {
            // redirect
            window.location.href = data.url;
        }
    }).catch(catchFetchError)

} // end of function
