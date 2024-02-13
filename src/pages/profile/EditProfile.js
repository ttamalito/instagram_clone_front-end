import {useEffect, useState} from "react";

import global from "../../globalVars";
import catchFetchError
    from "../../utils/catchFetchError";
import {useParams} from "react-router-dom";


export default function EditProfile({username, loggedIn}) {

    // state for the necessary data
    const [data, setData] = useState({});

    // paramsUsername
    const paramsUser = useParams().username;

    // useEffect to render the page
    useEffect(() => {
        // fetch the data
        fetchDataToEditProfile(paramsUser, setData)
    }, []);

    const title = <h1>{username}</h1>

    const profilePic = <img src={`${global.backend}${data.imagePath}`} />

    // check and unchecked public profile box
    const checked =    <>
        <label htmlFor="public">Public</label>
        <input type="checkbox" name="public" id="public" defaultChecked={true} />
    </>


    const unchecked =  <>
        <label htmlFor="public">Public</label>
        <input type="checkbox" name="public" id="public" />
    </>

    // form to edit the page
    const editForm =<form onSubmit={(event) => {
        onSubmitSendForm(event, paramsUser, data.csrf);
    }}>
        <input type="file" name={'profilePicture'} placeholder={'Choose an image plis'}/>
        <label htmlFor={'bio'}>Bio</label>
        <input type="text" name={'bio'} defaultValue={data.userBio} id={'bio'}/>
        {data.publicProfile ? checked : unchecked}
        <button type={'submit'} >Change Profile</button>

    </form>

    const page = <div>
        {title}
        {profilePic}
        {editForm}
    </div>

    return <>
        {data.ownProfile && page}
    </>



} // end of Edit Profile Page


/**
 * Fetches the necessary data to render the edit profile page
 * @param {String} username
 * @param {Function} setData
 */
function fetchDataToEditProfile(username, setData) {
    // send the request
    fetch(`${global.backend}/user/edit/${username}`, {
        method: 'GET',
        credentials: 'include'
    }).then(async response => {
        // get the data
        const data = await response.json();
        // check result
        if (data.result) {
            // successful
            setData(data)
        } else {
            // not good, redirect
            window.location.href = data.url;
        }
    }).catch(catchFetchError)
}

function onSubmitSendForm(event, username, csrf) {
    // prevent
    event.preventDefault();
    // get the form
    const formData = new FormData(event.nativeEvent.srcElement);
    // send the data
    fetch(`${global.backend}/user/edit/${username}?_csrf=${csrf}`, {
        method: 'POST',
        credentials: 'include',
        body: formData // multipart/form-data is set automatically
    }).then(async response => {
        // result
        const data = await response.json();
        if (data.result) {
            // redirect
            window.location.href = `/user/${username}`
        } else {
            // could not submit the form
            alert(`Could not submit the form, please try again later`);
        }
    }).catch(
        err => {
            console.error(err);
        }
    );
}