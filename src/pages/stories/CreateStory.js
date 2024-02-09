

import '../../styles/postStyles/formWithFile.css';
import fetchCSRF from "../../utils/fetchCSRF";

//global variables
import global from "../../globalVars";
import uploadFilesInChunks
    from "../../utils/uploadFilesInChunks";

export default function CreateStory() {
    // header
    const createStoryHeader = <h1>Create New Story</h1>

    // create post form
    const createStoryForm = <form onSubmit={upLoadStoryInChunks}>
        <div>

            <input type="file" id="filesForStory" name="fileToUpload" placeholder={'Images or Videos'}  multiple={true}  required={true}/>
        </div>


        <button className="btn">Create Story</button>
    </form>


    return (<div id={'create-story-container'} className={'form-with-file'}>
        {createStoryHeader}
        {createStoryForm}
    </div>)
}



function upLoadStoryInChunks(event) {
    // prevent the default submission
    event.preventDefault();

    // get the csrf token
    fetchCSRF(`${global.backend}/createStory`).then(async csrf => {
        // check if it is not an empty string
        if (csrf !== '') {
            // get the files for upload
            const files = event.nativeEvent.srcElement['filesForStory'].files;
            console.log(csrf);
            // prepare the url
            const url = `${global.backend}/uploadStory?_csrf=${csrf}`;
            // send all the files
            await uploadFilesInChunks(url, files, 1000000); // !1MB
            // once all the files are sent, redirect
            console.log(`After uploadFilesInChunksFunction: ${Date.now()}`)
            //window.location.href = '/';
        } else {
            // no csrf token
            console.log(`no csrf token`);
            alert(`No csrf token for you, maybe login or something`);
        }
    })

    // afterwards redirect
    //window.location.href = '/';
}



