

import global from "../../globalVars";

/**
 * This function just increments the displayed amount of notifications if a new cne comes
 *
 */
export default function connectAndDefineEvents(setNotifications) {
    // create the server sent event connection
    const sse = new EventSource(`${global.backend}/open-connection`, {withCredentials: true});
    sse.onmessage = console.log;
    sse.onopen = () => {console.log(`we have opened the connection`)};

    sse.addEventListener('testing', (e) => {
        const data = e.data;
        const parsedData = JSON.parse(data);
        console.log(parsedData.hello);

    })


// event to receive a like
    sse.addEventListener('like', e => {
        console.log(e);
        console.log('You received a like!');
        const data = e.data;
        console.log(data)
        // console.log(data);
        // update the counter of notifications
       setNotifications(extractAndIncrementAmountOfNotificationsOneParameter)
    });

    sse.addEventListener('comment', e => {
        // what to do on the evet
        console.log('You received a comment!');
        const data = e.data;
        console.log(data)
        // modify the notifications button
        setNotifications(extractAndIncrementAmountOfNotificationsOneParameter)
    });

    sse.addEventListener('new_follower', e => {
        console.log('You have a new follower');
        const data = e.data;
        console.log(data)
        // modify the button
        setNotifications(extractAndIncrementAmountOfNotificationsOneParameter)
    })

    sse.addEventListener('follow_request', e => {
        console.log('You have a new follow request');
        const data = e.data;
        console.log(data)
        setNotifications(extractAndIncrementAmountOfNotificationsOneParameter)
    })

// add the event listener for a message notification
    sse.addEventListener('message', e => {
        console.log(`We received a message`);
        const data = JSON.parse(e.data);
        console.log(data);
        setNotifications(extractAndIncrementAmountOfNotificationsOneParameter)
    })
}

/**
 * Extracts the amount of notifications from the string 'Show X Notifications'
 * @param {String} amount The string
 * @returns {string}
 */
function extractAndIncrementAmountOfNotificationsOneParameter(amount) {
    if (amount === '')
        return 'Show 1 Notification';

    const separatedArray = amount.split(' ');
    const n = parseInt(separatedArray[1]) + 1;
    return `Show ${n.toString()} Notifications`
}
