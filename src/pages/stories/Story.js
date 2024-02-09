import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import fetchStory
    from "../../utils/stories/fetchStory";


export default function Story() {
    // get the data to be fetched
    const params = useParams();
    const username = params.username;
    const filename = params.filename;
    const sequence = params.sequence;

    const imageRef = useRef({src: '', hidden: true});
    const videoRef = useRef({src: '', hidden: true});

    const [render, setRender] = useState(false);

    useEffect(() => {
        if (!render) {
            // fetch the stories if it is the initial render
            fetchStory(username, filename, sequence, imageRef, videoRef, setRender);
        }

    }, [render]);

    const image = <img src={imageRef.current.src} alt={'This is the story'}  hidden={imageRef.current.hidden}/>
    const video = <video src={videoRef.current.src}  hidden={videoRef.current.hidden} />

    return (
        <>
            {image}
            {video}
        </>
    )

} // end of Story component


