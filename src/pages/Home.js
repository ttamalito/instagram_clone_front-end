
import '../styles/home.css';
import {useEffect, useRef, useState} from "react";

/**
 * Creates the Home Page, if fetches the necessary data from the backend server
 * @return {JSX.Element}
 * @constructor
 */
export default function Home() {
    const [username, setUsername] = useState();
    const [loggedIn, setLoggedIn] = useState();
    //const username = useRef();
    //const loggedIn = useRef();
    useEffect(() => {
        //console.log('i fire')
        fetch(`http://localhost:3000/`, {
            method: 'GET',
            redirect: 'follow'
        }).then(res => {
            for (const h of res.headers) {
                console.log(h);
            }
            res.json().then(data => {
                // here we have the data
                console.log(data);
                setUsername(data.username);
                //username.current = data.username;
                //console.log(`Current: ${username.current}`)
                //console.log(`WHole: ${username}`)
                setLoggedIn(data.loggedIn)
                //loggedIn.current = data.loggedIn;
                //console.log(`Current: ${loggedIn.current}`)
                //console.log(`WHole: ${loggedIn}`)
            })
        }).catch(err => console.error(err))
    }, []);


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