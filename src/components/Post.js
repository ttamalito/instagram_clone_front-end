

import LikeComponentPost
    from "./postComponents/LikeComponentPost";
import CommentComponentPost
    from "./postComponents/CommentComponentPost";

import global from "../globalVars";


// styles
import '../styles/postStyles/post.css';

export default function Post({postId ,postOwner, postType, caption, likeCount, commentCount, postFileName, likeValue, classStyle}) {
    // define the owner of the post
    const ownerAnchor = <a className={'post-owner-anchor'} href={`/user/${postOwner}`}>{postOwner}</a>
    const postDocument = (postType === 'image') ? <img src={`${global.backend}/static/posts/${postFileName}`} /> :
        <video src={`${global.backend}/static/posts/${postFileName}`} controls={true} autoPlay={true} >

    </video>

    // caption
    const postCaption = <p className={'post-caption'}>{caption}</p>

    // return the post
    return (<div className={classStyle}>
        {ownerAnchor}
        {postDocument}
        {postCaption}
        <LikeComponentPost likeCount={likeCount} postId={postId} likedByUser={likeValue} />
        <CommentComponentPost commentCount={commentCount} postId={postId} />
    </div>)

}