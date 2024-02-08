
import global from "../globalVars";
import catchFetchError from "./catchFetchError";

export default async function checkIfUserHasStories(username) {

    // send the get request
    const storiesResponse = await fetch(`${global.backend}/getStories/${username}`, {
        method: 'GET',
        credentials: 'include'
    })

        // get the data
        const storiesData = await storiesResponse.json();
        // see if the result as successful
        if (storiesData.result) {
            // get the stories
            if (storiesData.stories.length > 0) {
                return {
                    result: true,
                    story: storiesData.stories[0]
                }; // return the first story
            } else {
                return {result:false}
            }
        } else {
            // we could not fetch any stories
            return {result: false}
        }
} // end of function