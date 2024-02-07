
import global from "../../globalVars";
import catchFetchError
    from "../../utils/catchFetchError";
import {useState} from "react";


/**
 *
 * @param {number} likeCount
 * @param {String} postId
 * @param {String} likedByUser
 * @return {JSX.Element}
 * @constructor
 */
export default function LikeComponentPost({likeCount, postId, likedByUser}) {

    const [likedByUserState, setLikedByUserState] = useState(likedByUser);
    const [likeCountState, setLikeCountState] = useState(likeCount);
    // define the function to send the get request
    const likeDislikePost = () => {
        // send the get request
        fetch(`${global.backend}/like/${postId}`, {
            method: 'GET',
            credentials: 'include'
        }).then(likeResponse => {
            // get the data to see if the operation completed
            likeResponse.json().then(likeData => {
                // check if the operation was completed
                if (likeData.result) {
                    // it was completed
                    setLikedByUserState(likeData.likeValue);
                    // set the new like count
                    setLikeCountState(likeData.likeCount);
                } else {
                    // the operation was not completed, i.e., the user was not logged in
                    window.location.href = likeData.url;
                }
            })
        }).catch(catchFetchError);
    } // end of function

    const like =     <div>
        <span id="like-count-<%= post._id %>">
            {likeCountState}
        </span>
        <button className="likedBy" value={postId} id={`see-like-${postId}`}>Likes</button>
        <button className="close-likes" id="close-like-<%= post._id %>">Close Likes</button>
        <div id="likes-<%= post._id %>" >
            <ul id="likes-list-<%= post._id %>">

            </ul>
        </div>
        <button className="button-like" onClick={likeDislikePost}>{likedByUserState}</button>
    </div>


    return like
} // end of Component
