
import '../styles/home.css';
import {useEffect, useRef, useState} from "react";

import global from "../globalVars";
import SearchResult
    from "../components/homeComponents/SearchResult";
import catchFetchError
    from "../utils/catchFetchError";

/**
 * Creates the Home Page, if fetches the necessary data from the backend server
 * @return {JSX.Element}
 * @constructor
 */
export default function Home({loggedIn, username}) {

    // define the items useState
    const [items, setItems] = useState([]);

    function onSubmitSearchHandler(event) {
        // prevent default behaviour
        event.preventDefault();
        console.log(event.nativeEvent.srcElement)
        const formData = new FormData(event.nativeEvent.srcElement);
        console.log(formData.keys())
        let urlString = '?';

        // populate the dataToSend
        for (const pair of formData) {
            console.log(pair);
            urlString += pair[0];
            urlString += '=';
            urlString += pair[1];
        }
        console.log(`About to send: ${urlString}`)
        // send the request
        fetch(`${global.backend}/search/searchUser${urlString}`,
            {
                method: 'GET',
                credentials: 'include'
            })
            .then(
                response => {
                    // get the response data
                    response.json().then(data => {
                        // see if the list is not empty
                        if (data.users.length !== 0) {
                            console.log(data.users);
                            // set the items
                            setItems(data.users);
                        }
                    })
                }
            ).catch(catchFetchError); // end of fetch
    } // end of onSubmitSearchHandler


    const welcomeUser = loggedIn ? <h2>Welcome {username}</h2> : <a href={`/login`}>Login</a>
    const profileLink = loggedIn ?
        <a href={`/user/${username}`}> Profile</a> : <a href={`/signup`}>Signup</a>
    const createAPost = <a href={`/createPost`}>Create a Post</a>

    const searchForm = <div className={'search-form'}>
        <form onSubmit={onSubmitSearchHandler}>
            <input type="text" name={'username'} placeholder={'Search'}  autoComplete={'off'}/>
            <button>Search</button>
        </form>
    </div>

    const searchResult = <SearchResult items={items} />
    return (<div id={"home-wrapper"}>
        <h1>Hello if you see this, that means it is working!</h1>
        {welcomeUser}
        {profileLink}
        {createAPost}
        {searchForm}
        {searchResult}
    </div>);
} // here ends Home



