

import '../../styles/chatStyles/chatInbox.css'
import {useState} from "react";
import fetchCSRF from "../../utils/fetchCSRF";

import global from "../../globalVars";

export default function ChatInbox({username}) {

    // state for displaying the form to start a new chat
    const [displayStartNewChat, setDisplayStartNewChat] = useState(false);

    // list of people that the user is following
    const [following, setFollowing] = useState([]);

    // state for the csrf token
    const [csrfToken, setCsrfToken] = useState('');

    // chat header
    const chatHeader = <h1>Your Messages</h1>

    // button to start a new chat
    const startChatButton = <button
        onClick={() => {
            onClickRenderAndFetchStartChat(setFollowing, setDisplayStartNewChat, username, setCsrfToken)}
    }
    >Start a new chat</button>

    // form to start a new chat
    const startChatForm  = <div>
        <form action="/chat/createSingleChat" method="POST">
            <input type="hidden" name={`_csrf`} value={csrfToken} />
                <label htmlFor="partner">Choose someone to chat</label>
                <select name="partner" id="partner">
                    {following.map((item) => {
                        return <option key={item} value={item}>{item}</option>
                    })}
                </select>

                <button type="submit">Create the chat</button>
        </form>
    </div>


    // main chat container
    const chatContainer = <div id="chats-container">
        <div id="chats-overview">
            <ul id="active-chats"></ul>
        </div>
        <div id="main-chat">

            <div id="messageTo"></div>

            <div id="chat-with" ></div>

            <div id="chatId" ></div>

            <div id="messageFrom" ></div>
            <div id="conversation">
                <ol id="conversation-messages"></ol>
            </div>
            <div id="message-input" >
                <form id="chat-form">
                    <input type="text" name="message" id="message" autoComplete="off"  placeholder={'Type a message'}/>
                        <button type="submit">Send</button>
                </form>
            </div>
        </div>
    </div>

    return (<div id={'chat-inbox-wrapper'}>
        {chatHeader}
        {startChatButton}
        {displayStartNewChat && startChatForm}
        {chatContainer}
    </div>)
}

// handler to render the form and fetch the csrf token as well as the following list
/**
 * Handles the logic to display the form, to start a new chat
 * @param {Function} setFollowingList
 * @param {Function} setDisplayStartNewChat
 * @param {String} username
 * @param {Function} setCsrfToken
 */
function onClickRenderAndFetchStartChat(setFollowingList, setDisplayStartNewChat, username, setCsrfToken) {
    // first fetch the csrf token
    const url = `${global.backend}/chat/startNewChat`;
    fetchCSRF(url).then(async csrf => {
        if (csrf !== '') {
            // we have a token
            // fetch the list of the people that the user is following
            const followingResponse = await fetch(`${global.backend}/user/${username}/following`, {
                method: 'GET',
                credentials: 'include'
            });
            // get the data
            const followingData = await followingResponse.json();
            // check if the operation was completed
            if (followingData.result) {
                // we have a list
                // the list is a list of usernames
                // give it so that it renders the list and the form
                // set the csrfToken
                setCsrfToken(csrf);
                setFollowingList(followingData.following);
                // set it so that the form is displayed
                setDisplayStartNewChat(true);
            } else {
                // the list could not be fetched
                console.log(`The list could not be fetched`);
                // redirect
                //window.location.href = '/';
            }
        } else {
            // there is no token
            window.location.href = '/error';
        }
    })
}