/**
 *
 * @param {number} commentCount
 * @param {String} postId
 * @return {JSX.Element}
 * @constructor
 */
export default function CommentComponentPost({commentCount, postId}) {
    const comment =
        <div>
        <span id="comment-count-<%= post._id %>">
            {commentCount}
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
            <form id="form-<%= post._id %>" >
                <input type="hidden" name="_csrf" value="<%= locals.csrfToken %>" />
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