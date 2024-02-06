import global from "../globalVars";

/**
 * Function to be used as a general error callback when using fetch
 * It logs the error and redirects the user to the /error page
 * @param err
 */
export default function catchFetchError(err) {
    console.error(err);
    // now redirect to the error page
    window.location.href = `${global.domain}/error`;
}