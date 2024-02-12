
import global from "../../globalVars";

/**
 * Opens a websocket connection for the given username,
 * add the event to receive a message
 * @param {String} username
 * @param {MutableRefObject<String>} mainChatId
 * @param {Function} setMessages
 * @return {WebSocket} the connection, if username is not null
 */
export default function openWebSocketConnection(username, mainChatId, setMessages) {
    // check if undefined, so that we return null
    if (!username)
        return null;

    // open the connection
    const ws = new WebSocket(`ws://localhost:3000/${username}`);

    ws.onopen = e => console.log(`WebSocket connection open`);

    // add the listener for receiving a message
    ws.onmessage = m => {
        const message = JSON.parse(m.data);
        receiveMessage(message, mainChatId, setMessages);
    }

    // return it
    return ws;
}


/**
 * Handles the logic for receiving a message
 * This function is called every time the websocket receives some data, i.e. a message
 * @param message
 * @param {MutableRefObject<String>} mainChatId
 * @param {Function} setMessages
 */
function receiveMessage(message, mainChatId, setMessages) {
    /*
messageFrom: String – id of the user
messageTo: String – id of the user
chatId: String – Id of the chat
content: String – content of the message
*/

    // get the chat id
    const chatId = message.chatId;
    // check if it is the main chat
    if (chatId === mainChatId.current) {
        // yes, add the message to the list
        // but first refactor it
        message.partnerUserId = message.messageFrom;
        setMessages(prev => {
            const data = Array.from(prev);
            data.push(message);
            return data;
        })
    }
} // end of receiveMessage