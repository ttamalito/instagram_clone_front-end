
import global from "../../globalVars";

/**
 * Fetches the amount of notifications for a user
 * @returns {Promise<number>}
 */
export default async function fetchAmountOfNotifications() {
    // fetch the amount of notifications that a user has
    const responseAmountNotifications = await fetch(`${global.backend}/fetchNotifications`, {
        method: 'GET',
        credentials: 'include'
    })

// get the data
    const data = await responseAmountNotifications.json();
    return data.amountNotifications;
} // end of function