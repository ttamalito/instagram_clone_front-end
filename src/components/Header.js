
import '../styles/header.css'

export default function Header({loggedIn}) {

    const homeDiv = <div id={'home-div'}><a
        href={'/'}>Home</a></div>

    // log out button
    const logOut = <button id={'logout-button-header'}>Logout</button>
    // chats anchor
    const chatAnchor = <a href={'/chat/inbox'}>Chats</a>
    //story anchor
    const storyAnchor = <a href={'/createStory'}>Create a Story</a>

    // button to show the notifications
    const showNotificationsButton = <button id={'show-notifications-button'}>Show 0 Notifications(change it!)</button>

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
    {showNotificationsButton}
    {notificationsDiv}
    </>

    // return the component
    return (<nav id={'header-nav'}>
        {homeDiv}
        {loggedIn && allOfThem}
    </nav>)
}