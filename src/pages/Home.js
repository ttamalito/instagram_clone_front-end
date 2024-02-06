
import '../styles/home.css';
import {useEffect, useRef, useState} from "react";

import global from "../globalVars";

/**
 * Creates the Home Page, if fetches the necessary data from the backend server
 * @return {JSX.Element}
 * @constructor
 */
export default function Home({loggedIn, username}) {

    const welcomeUser = loggedIn ? <h2>Welcome {username}</h2> : <a href={`/login`}>Login</a>
    const profileLink = loggedIn ?
        <a href={`/user`}> Profile</a> : <a href={`/signup`}>Signup</a>
    const createAPost = <a href={`/createPost`}>Create a Post</a>

    const searchForm = <div className={'search-form'}>
        <form>
            <input type="text" placeholder={'Search'}/>
            <button>Search</button>
        </form>
    </div>

    const searchResult = <div id="search-result"></div>
    return (<div id={"home-wrapper"}>
        <h1>Hello if you see this, that means it is working!</h1>
        {welcomeUser}
        {profileLink}
        {createAPost}
        {searchForm}
        {searchResult}
    </div>);
}