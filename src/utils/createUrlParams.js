/**
 * Creates a URLSearchParams object to be sent in the body of a post fetch request
 * @param form The Form object
 * @return {module:url.URLSearchParams}
 */
export default function createUrlParams(form) {
    // get the form data
    const formData = new FormData(form);

    // create the urlParams
    const urlData = new URLSearchParams();
    for (const pair of formData) {
        console.log(pair[0], pair[1]);
        urlData.append(pair[0], pair[1]);
    }

    return urlData;
}