import catchFetchError from "./catchFetchError";


/**
 * Fetches the csrf token given an url
 * @param {String} url
 * @return {Promise<String>} The csrf token, if it was fetched, otherwise returns an empty string
 */
export default async function fetchCSRF(url) {
    // send the get request
    const response = await fetch(url, {
                                                            method: 'GET',
                                                            credentials: 'include'
                                                        });

    const data = await response.json();
    // check if the result was true
    if (data.result) {
        // return the csrf token
        console.log(`The csrf token: ${data.csrf}`);
        return data.csrf;
    } else {
        return '';
    }

} // end of fuciton