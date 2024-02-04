


export default function Profile() {
    const username = 'Dummy_username'
    // fetch the user bio
    const userBioFetched = 'This is supposed to be fetched';
    const usernameHeader = <h1>{username}</h1>
    const profilePicture = <img src={'/'} alt={'This is supposed to be the profile pic'}/>
    const bio = <div id={'profile-bio'}>
        <h3>Bio of {username}</h3>
        <p>{userBioFetched}</p>
    </div>

}