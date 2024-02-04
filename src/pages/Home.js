
import '../styles/home.css';

export default function Home() {

    const username = 'Dummy username';
    const loggedIn = true;
    const welcomeUser = loggedIn ? <h2>Welcome {username}</h2> : <a href={`/login`}>Login</a>
    const profileLink = loggedIn ?
        <a href={`/user`}> Profile</a> : <a href={`/signup`}>Signup</a>
    const createAPost = <a href={`/createPost`}>Create a Post</a>

    const searchForm = <form>
        <label>Search For a User</label>
        <input type="text"/>
        <button>Search</button>
    </form>

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