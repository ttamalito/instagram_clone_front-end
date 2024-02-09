

import global from "../../globalVars";

export default async function fetchStory(username, filename, sequence, imageRef, videoRef, setRender) {
    // send the get request
    const response = await fetch(`${global.backend}/stories/${username}/${filename}/${sequence}`, {
        method: 'GET',
        credentials: 'include'
    })
    //log the response
    console.log(response);
    // log the headers
    const contentType = response.headers.get('content-type');
    const nextLink = response.headers.get('next-story-link');
    console.log(nextLink);
    // check if we are dealing with an image or video
    if (contentType[0] === 'i') {
        // it is an image
        // get the arrayBuffre
        const arr = await response.arrayBuffer();
        console.log(`we have an array buffer`);
        console.log(arr)
        // convert the array to base64
        const base64 = btoa(
            new Uint8Array(arr)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        // add the byte array as an image
        imageRef.current.src = `data:${contentType};base64,${base64}`;
        imageRef.current.hidden = false;

        // check if there are more stories

        // re render
        setRender(true);
    }  else {
        console.log(`It is a video!`);
        // it is a video
        videoRef.current.src = `${global.backend}/stories/${username}/${filename}/${sequence}`;
        videoRef.current.hidden = false;
        // re render the page
        setRender(true);
        //moreStories();
    }


    // get the data from the response
} // end of function