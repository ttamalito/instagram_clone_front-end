/**
 * A single message in the chat
 * @param {Message} message
 * @constructor
 */
export default function Message({message}) {
    const messageDiv = <div>
        <p>{message.content}</p>
    </div>

    let className = 'sent-message';
    if (message.messageFrom === message.partnerUserId) {
        className = 'received-message';
    }

    return <li key={message.date} className={className}>{messageDiv}</li>
}


/**
 * @typedef {Object} Message
 * @property {String} messageFrom id of the user that sent the message
 * @property {String} messageTo id of the user that received the message
 * @property {String} partnerUserId id of the user that the client is having a conversation
 * @property {String} date
 * @property {String} content
 * @property {[String]} likes the ids of the users that liked the message
 */
