

import LikeComponentPost
    from "./postComponents/LikeComponentPost";
import CommentComponentPost
    from "./postComponents/CommentComponentPost";

import global from "../globalVars";


// styles
import '../styles/postStyles/post.css';

/**
 *
 * @param postId
 * @param postOwner
 * @param postType
 * @param caption
 * @param likeCount
 * @param commentCount
 * @param postFileName
 * @param likeValue
 * @param {String} classStyle defines how the post should be displayed, i.e. in a grid, as a single post or in the home page
 * @return {JSX.Element}
 * @constructor
 */
export default function Post({postId ,postOwner, postType, caption, likeCount, commentCount, postFileName, likeValue, classStyle}) {
    // define the owner of the post
    const ownerAnchor = <a className={'post-owner-anchor'} href={`/user/${postOwner}`}>{postOwner}</a>
    const postDocument = (postType === 'image') ? <img src={`${global.backend}/static/posts/${postFileName}`} /> :
        <video src={`${global.backend}/static/posts/${postFileName}`} controls={true} autoPlay={true} >

    </video>

    const likesAndCommentsHover = <section className='likes-comments-hover'>
        <h1>{likeCount} Likes</h1>
        <h1>{commentCount} Comments</h1>
    </section>

    // caption
    const postCaption = <p className={'post-caption'}>{caption}</p>


    const profileGrid = classStyle === 'profile-grid';

    // return the post
    return (<div className={classStyle}>
        {!profileGrid && ownerAnchor}
        {postDocument}
        {profileGrid && likesAndCommentsHover}
        { !profileGrid && postCaption}
        {!profileGrid && <LikeComponentPost likeCount={likeCount} postId={postId} likedByUser={likeValue} />}
        {!profileGrid && <CommentComponentPost commentCount={commentCount} postId={postId} />}
    </div>)

}