import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import fetchStory
    from "../../utils/stories/fetchStory";


// import the styles
import '../../styles/storiesStyles/story.css'

export default function Story() {
    // get the data to be fetched
    const params = useParams();
    const username = params.username;
    const filename = params.filename;
    const sequence = params.sequence;

    const imageRef = useRef({src: '', hidden: true});
    const videoRef = useRef({src: '', hidden: true});
    const nextRef = useRef('');

    const [render, setRender] = useState(false);

    useEffect(() => {
        if (!render) {
            // fetch the stories if it is the initial render
            fetchStory(username, filename, sequence, imageRef, videoRef, setRender, nextRef);
        }

    }, [render]);

    const image = <img src={imageRef.current.src} alt={'This is the story'}  className={'media'}/>
    const video = <video src={videoRef.current.src}  className={'media'} />
    const next = <a href={nextRef.current} className={'next-story-anchor'}>Next Story</a>

    return (
    <div className={'main-story-container'}>
        <div className={'story-wrapper'}>
            {!imageRef.current.hidden && image}
            {!videoRef.current.hidden && video}

        </div>
        {render && next}</div>
    )

} // end of Story component


