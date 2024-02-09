
import '../styles/header.css'


import global from "../globalVars";
import {useEffect, useRef, useState} from "react";
import connectAndDefineEvents
    from "../utils/serverSentEvents/connectAndDefineEvents";

export default function Header({loggedIn}) {

    // set a state for the amount of notifications in the button
    const [notifications, setNotifications] = useState('');
    // set the ref, so that the object keeps being updated
    const notificationsRef = useRef('');

    // define a useEffectToStart the server sent event connection
    useEffect(() => {
        connectAndDefineEvents(setNotifications);
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
    const showNotificationsButton = <button>{notifications}</button>

    // notifications div
    const notificationsDiv = <div id={'show-notifications-div'}>
        <ul id="requestToFollow-list"></ul>
        <ul id="follow-list"></ul>
        <ul id="likes-list"></ul>
        <ul id="comments-list"></ul>
        <ul id="notifications-chats-list"></ul>
    </div>

    const allOfThem = <>
    {logOut}
    {chatAnchor}
    {storyAnchor}
    {notifications !== '' && showNotificationsButton}
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