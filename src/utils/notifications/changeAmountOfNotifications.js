/**
 * Changes the amount of notifications, given the previous state
 * @param {String} amountNotifications
 * @param {number} change the amount to increase or decrease the number (1, -1)
 * @return {string}
 */
export default function changeAmountOfNotifications(amountNotifications, change) {
    if (amountNotifications === '' && change === 1) {
        return 'Show 1 Notification'
    }
    const separatedArray = amountNotifications.split(' ');
    const n = parseInt(separatedArray[1]) + change;
    if (n === 0) {
        return ''
    }
    return `Show ${n.toString()} Notifications`
}