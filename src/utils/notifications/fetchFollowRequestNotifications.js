
import global from "../../globalVars";
import FollowRequestNotificationsList
    from "../../components/homeComponents/FollowRequestNotificationsList";
import catchFetchError from "../catchFetchError";

/**
 * Fetches the notifications to request to follow
 * and renders the list
 * @returns {Promise<void>}
 */
export default function fetchFollowRequestNotifications(setFollowRequestNotificationsList, setAmountNotifications) {
    fetch(`${global.backend}/fetchFollowRequestNotifications`, // this is the userId
        {
            method: 'GET',
            credentials: 'include'
        }).then(responseRequestToFollow => {
            // get the data
            responseRequestToFollow.json().then(dataRequestToFollow => {
                // check if the result is true
                if (dataRequestToFollow.result) {
                    // render the list
                    const notifications = dataRequestToFollow.requestToFollow;
                    const list =
                        <FollowRequestNotificationsList
                            notifications={notifications}
                            setFollowRequestNotificationsList={setFollowRequestNotificationsList}
                            setAmountNotifications={setAmountNotifications}/>
                    setFollowRequestNotificationsList(list);
                } else {
                    console.log(`The list could not be retrieved`)
                }
            })
    }).catch(catchFetchError);





/*
    // now populate the list
    // but first empty it
    const requestToFollowlist = document.querySelector('#requestToFollow-list');
    removeAllChildNodes(requestToFollowlist);
    for (const notification of dataRequestToFollow.requestToFollow) {
        const li = document.createElement('li')
        const container = document.createElement('div');
        const anchorUser = document.createElement('a');
        anchorUser.textContent = notification.username;
        anchorUser.href = `/user/${notification.username}`;
        container.append(anchorUser);

        const buttonAccept = document.createElement('button');
        const buttonReject = document.createElement('button');

        buttonAccept.textContent = 'Accept';
        buttonAccept.value = `user/acceptFollow/${notification.username}`
        // add the event listener to the button to send the request to the server
        buttonAccept.addEventListener('click', async e => {

        }); // end of eventListener of buttonAccept

        buttonReject.textContent = 'Reject';
        buttonReject.value = `user/rejectFollow/${notification.username}`;


        // add the event listener of the reject button
        buttonReject.addEventListener('click', async e => {
            // send a request
            const response = await fetch(`http://localhost:3000/${buttonReject.value}`);
            // check if we need to redirect
            if (response.redirected) {
                window.location.href = response.url;
            }

            // get the result
            const data = await response.json();
            if (data.result) {
                // operation was successful
                // remove the list item from the list
                requestToFollowlist.removeChild(li);
                // change the text content of the show-notifications-button
                const liItems = requestToFollowlist.querySelectorAll('li');
                console.log(liItems.length);
                if (liItems.length > 0) {

                    notificationsButton.textContent = extractAndIncrementAmountOfNotifications(
                        notificationsButton.textContent, -1);
                } else {
                    if (extractAmountOfNotifications(notificationsButton.textContent) === 1) {
                        // there was only was notification, and it was removed, so close everything
                        notificationsButton.style.visibility = 'hidden';
                        notificationsDiv.style.visibility = 'hidden';
                        notificationsButton.textContent = '';
                    } else {
                        // decrease the amount of notifications by one
                        notificationsButton.textContent = extractAndIncrementAmountOfNotifications(
                            notificationsButton.textContent, -1);
                    }

                } // here ends the else of liItems.length > 0


            } // if the operation was executed successfully
        }); // end of eventListener of buttonAccept

        container.append(buttonAccept);
        container.append(buttonReject);

        // set the date of the notification
        const date = setNotificationDate(notification.date);
        container.append(date);

        // now populate the list
        li.append(container);
        requestToFollowlist.append(li);

    } // here ends the for loop
 */
} // here ends the function