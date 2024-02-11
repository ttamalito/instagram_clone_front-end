
import '../styles/header.css'


import global from "../globalVars";
import {useEffect, useRef, useState} from "react";
import connectAndDefineEvents
    from "../utils/serverSentEvents/connectAndDefineEvents";
import fetchFollowRequestNotifications
    from "../utils/notifications/fetchFollowRequestNotifications";
import fetchFollowNotifications
    from "../utils/notifications/fetchFollowNotifications";
import fetchLikeNotifications
    from "../utils/notifications/fetchLikeNotifications";
import fetchCommentNotifications
    from "../utils/notifications/fetchCommentNotifications";

export default function Header({loggedIn, amountNotifications, setAmountNotifications}) {
    // set the states for all the notifications list
    const [followRequestNotificationsList, setFollowRequestNotificationsList] = useState(<ul></ul>);

    const [followNotificationsList, setFollowNotificationsList] = useState(<ul></ul>);

    // like notifications list
    const [likeNotificationsList, setLikeNotificationsList] = useState(<ul></ul>);

    // comment notification list
    const [commentNotificationsList, setCommentNotificationsList] = useState(<ul></ul>);

    // define a useEffectToStart the server sent event connection
    useEffect(() => {
        connectAndDefineEvents(setAmountNotifications);
    }, []);

    const homeDiv = <div id={'home-div'}><a
        href={'/'}>Home</a></div>

    // log out button
    const logOut = <button id={'logout-button-header'}  onClick={onClickHandlerLogout}>Logout</button>
    // chats anchor
    const chatAnchor = <a href={'/chat/inbox'}>Chats</a>
    //story anchor
    const storyAnchor = <a href={'/createStory'}>Create a Story</a>

    // button to show the notifications
    const showNotificationsButton = <button
        onClick={() => {
            onClickFetchNotifications(
                setFollowRequestNotificationsList,
                setFollowNotificationsList,
                setLikeNotificationsList,
                setCommentNotificationsList,
                setAmountNotifications)
        }
        }>{amountNotifications}</button>

    // notifications div
    // render all the notifications lists
    const notificationsDiv = <div id={'show-notifications-div'}>
        {followRequestNotificationsList}
        {followNotificationsList}
        {likeNotificationsList}
        {commentNotificationsList}
        <ul id="notifications-chats-list"></ul>
    </div>

    const allOfThem = <>
    {logOut}
    {chatAnchor}
    {storyAnchor}
        {amountNotifications !== '' &&  showNotificationsButton}
    {notificationsDiv}
    </>

    // return the component
    return (<nav id={'header-nav'}>
        {homeDiv}
        {loggedIn && allOfThem}
    </nav>)
}


/**
 * Contains the logic to send a GET request to the backend to logout
 * @param {Event} event
 */
function onClickHandlerLogout(event) {
    // send the GET request
    fetch(`${global.backend}/logout`, {
        method:'GET',
        credentials: 'include'
    })
        .then(response => {
            // check if the operation was not successful
            response.json().then(data => {
                if (data.result) {
                    // the operation was successful
                    // redirect to the main page
                    window.location.href = global.domain;
                } else {
                    // it was not successful
                    // redirect to wherever the backend points
                    window.location.href = data.url;
                }
            })
        }).catch(err => {
            // the fetch request failed
            console.error(err);
            // redirect to error page
            window.location.href = `${global.domain}/error`;
    })

} // here ends onClickHandlerLogout


function onClickFetchNotifications(setFollowRequestNotificationsList,
                                   setFollowNotificationsList,
                                   setLikeNotificationsList,
                                   setCommentNotificationsList
                                   ,setAmountNotifications) {

    // fetch all the notifications and populate the lists
    fetchFollowRequestNotifications(setFollowRequestNotificationsList, setAmountNotifications);
    fetchFollowNotifications(setFollowNotificationsList, setAmountNotifications);
    fetchLikeNotifications(setLikeNotificationsList, setAmountNotifications);
    fetchCommentNotifications(setCommentNotificationsList, setAmountNotifications);
} // end of function