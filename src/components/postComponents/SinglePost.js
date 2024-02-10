import {useParams} from "react-router-dom";


import global from "../../globalVars";


import {useEffect, useState} from "react";
import LikeComponentPost
    from "./LikeComponentPost";
import CommentComponentPost
    from "./CommentComponentPost";
import catchFetchError
    from "../../utils/catchFetchError";


import '../../styles/postStyles/singlePost.css'

/**
 *

 * @return {JSX.Element}
 * @constructor
 */
export default function SinglePost() {
    // get the post id from the route
    const params = useParams();
    const postId = params.id;
    const [post, setPost] = useState({});
    const [owner, setOwner] = useState('');
    // fetchAll the data
    useEffect(() => {
        // fetch the data
        fetchPost(postId, setPost, setOwner);
    }, []);
    // define the owner of the post
    const ownerAnchor = <a className={'post-owner-anchor'} href={`/user/${owner}`}>{owner}</a>
    const postDocument = (post.postType === 'image') ? <img src={`${global.backend}/static/posts/${post.fileName}`}  className={'media'}/> :
        <video src={`${global.backend}/static/posts/${post.fileName}`} controls={true} autoPlay={true} className={'media'} >

        </video>

    const likesAndCommentsHover = <section className='likes-comments-hover'>
        <h1>{post.likeCount} Likes</h1>
        <h1>{post.commentCount} Comments</h1>
    </section>

    // caption
    const postCaption = <p className={'post-caption'}>{post.caption}</p>

    // return the post
    return (<div className={'single-post'}>
        {ownerAnchor}
        {postDocument}
        {postCaption}
        {<LikeComponentPost likeCount={post.likeCount} postId={postId} likedByUser={post.likeValue} />}
        {<CommentComponentPost commentCount={post.commentCount} postId={postId} />}
    </div>)

} // end of single post

/**
 * Fetches the necessary data for a post
 * @param postId
 * @param {Function} setPost
 * @param {Function} setOwner
 */
function fetchPost(postId, setPost, setOwner) {
    // make the GET request
    fetch(`${global.backend}/post/${postId}`, {
        method: 'GET',
        credentials: 'include'
    }).then(async postResponse => {
        // get the data
        const postData = await postResponse.json();
        // see if operation was successful
        if (postData.result) {
            // all good, the set all the values to trigger a re render
            setPost(postData.post);
            setOwner(postData.username); // owner of the post
        } else {
            // fetching the post could not be done
            //console.log(`The server did not send the post`);
            window.location.href = postData.url;
        }
    }).catch(catchFetchError)
}