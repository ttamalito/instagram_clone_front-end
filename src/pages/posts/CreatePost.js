
import '../../styles/postStyles/formWithFile.css'
import createUrlParams
    from "../../utils/createUrlParams";


// global vars
import global from "../../globalVars";
import catchFetchError
    from "../../utils/catchFetchError";

/**
 * Page to create a new post
 * @return {JSX.Element}
 * @constructor
 */
export default function CreatePost() {

    // header
    const createPostHeader = <h1>Create New Post</h1>

    // create post form
    const createPostForm = <form onSubmit={onSubmitSendPost}>
        <div>

            <input type="file" id="image/video" name="fileToUpload" placeholder={'Image or Video'} />
        </div>
        <div>
            <input type="text" id="caption" name="caption" placeholder={'Caption'} />
        </div>


        <button className="btn">Create Post</button>
    </form>


    return (<div id={'create-post-container'} className={'form-with-file'}>
        {createPostHeader}
        {createPostForm}
    </div>)
} // end of component

// define a handler for the event submit on the form
function onSubmitSendPost(event) {
    // prevent the default
    event.preventDefault();

    // get the data
   // const urlData = createUrlParams(event.nativeEvent.srcElement);
    const formData = new FormData(event.nativeEvent.srcElement);
    // now send the first get request to get the csrf token
    fetch(`${global.backend}/createPost`, {
        method: 'GET',
        credentials: 'include'
    }).then(async getResponse => {
        // retrieve the data, that is the csrf token
        const getData = await getResponse.json();
        if (getData.result) {
            // there is a csrf token
            // send the post request to submit the form
        try {
            const postResponse = await fetch(`${global.backend}/createPost?_csrf=${getData.csrf}`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
            const postData = await postResponse.json();
            if (postData.result) {
                // redirect to the home page
                window.location.href = `${global.domain}`;
            }

        } catch (err) {
            // there was an error fetching the reponse
            console.error(err);
            window.location.href = `${global.domain}/error`
        } // end of catch
        }  else {
            // there is no token for this client
            // redirect to wherever the server says
            //console.log(`There is no token for u`)
            window.location.href = getData.url;
        }
        } // end of then() callback
    ).catch(catchFetchError)

} // onSubmitSendPost ends