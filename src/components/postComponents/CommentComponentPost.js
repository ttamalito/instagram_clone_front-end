

import global from "../../globalVars";
import fetchCSRF from "../../utils/fetchCSRF";
import catchFetchError
    from "../../utils/catchFetchError";
import createUrlParams
    from "../../utils/createUrlParams";
import {useState} from "react";

/**
 *
 * @param {number} commentCount
 * @param {String} postId
 * @return {JSX.Element}
 * @constructor
 */
export default function CommentComponentPost({commentCount, postId}) {

    const [count, setCount] = useState(commentCount);

    // function to submit a comment
    const onSubmitPostComment = (event) => {
        // prevent the default
        event.preventDefault();

        // define the url
        const url = `${global.backend}/post/comment/${postId}`;

        // prepare the data to send
        const urlParams = createUrlParams(event.nativeEvent.srcElement);

        // fetch the csrfToken
        fetchCSRF(url).then(async csrf => {
            // with the csrf token, send the post request
            console.log(`The csrf Token: ${csrf}`)
            if (csrf !== '') {
                const commentResponse = await fetch( `${url}?_csrf=${csrf}`, {
                    method: 'POST',
                    credentials: 'include',
                    body: urlParams
                })
                console.log(commentResponse)
                // now check the result
                const commentData = await commentResponse.json();
                if (commentData.result) {
                    // update the comment count
                    setCount(commentData.commentCount);
                    //TODO - here we need to close the form and erase the data
                } else {
                    // could not post the commnet
                    window.location.href = commentData.url;
                }
            } else {
                console.log(`there is no csrf token`)
            }
        }).catch(catchFetchError)
    }

    const comment =
        <div>
        <span id="comment-count-<%= post._id %>">
            {count}
        </span>
        <button className="see-comments"  id={`see-comment-${postId}`}>Comments</button>
        <button className="close-comments"  id="close-comment-<%= post._id %>"
                 >Close comments</button>
        <div id="comments-<%= post._id %>" >
            <ul id="list-<%= post._id %>">
            </ul>
        </div>
        <button className="leave-comment" value="<%= post._id %>">Leave a Comment</button>

        <div className={'leave-comment-post'} >
            <h1>
                Leave a comment:
            </h1>
            <form onSubmit={onSubmitPostComment} >
                    <div>
                        <label htmlFor="comment-<%= post._id %>">Comment</label>
                        <input type="text" id="comment-<%= post._id %>" name="comment" required={true} />
                    </div>


                    <button className="post-comment" value="<%= post._id %>">Post Comment</button>
                    <p id="switch-form">
                        <a href="/">Return home</a>
                    </p>
            </form>
        </div>
    </div>

    return comment;
}


function onClickPostComment(event) {


    // get the csrfToken

}