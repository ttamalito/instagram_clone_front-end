

import '../../styles/chatStyles/chatInbox.css'

export default function ChatInbox() {


    // chat header
    const chatHeader = <h1>Your Messages</h1>

    // anchor to start a new chat
    const startChatAnchor = <a href={'http://localhost:3000/chat/startNewChat/'}>Start a new Chat!</a>


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
        {startChatAnchor}
        {chatContainer}
    </div>)
}