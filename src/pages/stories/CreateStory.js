

import '../../styles/postStyles/formWithFile.css';

export default function CreateStory() {
    // header
    const createStoryHeader = <h1>Create New Story</h1>

    // create post form
    const createStoryForm = <form>
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