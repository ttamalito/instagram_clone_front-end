
import '../../styles/postStyles/formWithFile.css'

/**
 * Page to create a new post
 * @return {JSX.Element}
 * @constructor
 */
export default function CreatePost() {

    // header
    const createPostHeader = <h1>Create New Post</h1>

    // create post form
    const createPostForm = <form>
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
}