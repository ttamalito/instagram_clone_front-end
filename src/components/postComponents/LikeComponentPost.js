/**
 *
 * @param {number} likeCount
 * @param {String} postId
 * @param {String} likedByUser
 * @return {JSX.Element}
 * @constructor
 */
export default function LikeComponentPost({likeCount, postId, likedByUser}) {

    const like =     <div>
        <span id="like-count-<%= post._id %>">
            {likeCount}
        </span>
        <button className="likedBy" value={postId} id={`see-like-${postId}`}>Likes</button>
        <button className="close-likes" id="close-like-<%= post._id %>" value="<%= post._id %>"
                >Close Likes</button>
        <div id="likes-<%= post._id %>" >
            <ul id="likes-list-<%= post._id %>">

            </ul>
        </div>
        <button className="button-like" value="<%= post._id %>">{likedByUser}</button>
    </div>


    return like
}