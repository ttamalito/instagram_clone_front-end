

import LikeComponentPost
    from "./postComponents/LikeComponentPost";
import CommentComponentPost
    from "./postComponents/CommentComponentPost";


export default function Post({postId ,postOwner, postType, caption, likeCount, commentCount, postFileName, likeValue}) {

    // define the owner of the post
    const ownerAnchor = <a className={'post-owner-anchor'} href={`/user/${postOwner}`}>{postOwner}</a>

    const postDocument = (postType === 'image') ? <img src={`http:localhost:3000/static/posts/${postFileName}`}/> :
        <video src={`/static/posts/${postFileName}`} controls={true} autoPlay={true}>

    </video>

    // caption
    const postCaption = <p className={'post-caption'}>{caption}</p>

    // return the post
    return (<div className={'post'}>
        {ownerAnchor}
        {postDocument}
        {postCaption}
        <LikeComponentPost likeCount={likeCount} postId={postId} likedByUser={likeValue} />
        <CommentComponentPost commentCount={commentCount} postId={postId} />
    </div>)

}