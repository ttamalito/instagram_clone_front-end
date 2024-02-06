


import '../styles/authenticationStyles/authenticationForm.css'
import {useEffect, useRef, useState} from "react";

import global from "../globalVars";

// import utils
import createUrlParams
    from "../utils/createUrlParams";
import catchFetchError
    from "../utils/catchFetchError";

/**
 * Creates the Login Page
 * @return {JSX.Element}
 * @constructor
 */
export default function Login() {

    // fetch if the user put an invalid credential
    const invalidCredentials = false;
    // fetch if the user put an invalid password
    const invalidPassword = false;
    const loginHeader = <h1>Login</h1>
    // login form
    const loginForm = <form onSubmit={postRequestToLogin}>

            <div className={'authentication-form-label-input'}>

                {(invalidCredentials) &&  <p>No user with that email, please try again!</p>}

                {(invalidPassword) && <p>Credentials do not match, please try again!</p>}

                <input type="email" id="user-email" name="email"  placeholder={'E-mail'}/>
            </div>
            <div className={'authentication-form-label-input'}>

                <input type="text" id="username" name="username" placeholder={'Username'}/>
            </div>
            <div className={'authentication-form-label-input'}>
                <input type="password" id="password" name="password" minLength="6" placeholder={'Password'} />
            </div>
            <button className="btn">Login</button>
            <p>
                <a href="/changePassword">Forgot Password</a>
            </p>
            <p id="switch-form">
                <a href="/signup">Create an account instead</a>
            </p>
    </form>

    return (<div id={'login-form'} className={'authentication-form'}>
        {loginHeader}
        {loginForm}
    </div>)
}



/**
 * Sends the POST request to the backend, to log a user in
 * @param {Event} event
 * @return {Promise<void>}
 */
function postRequestToLogin(event) {
    // send the request
    // prevent the default behaviour of the event
    event.preventDefault();
    const urlData = createUrlParams(event.nativeEvent.srcElement);
    fetch(`${global.backend}/login`, {
        method: "GET",
        redirect: 'follow',
        credentials: 'include'
    }).then(res => {
            res.json().then(data => {
                // check if there is a token
                console.log(`This is the data that we recieved ${data}`)
                if (data.result) {
                    // there is a token
                    console.log(`there is a token ${data.csrf}`)
                    fetch(`${global.backend}/login?_csrf=${data.csrf}`, {
                        method: "POST",
                        redirect: 'follow',
                        body: urlData,
                        credentials:'include'
                    }).then(res => {
                        console.log(res);
                        res.json().then(postData => {
                            // the data of the post request
                            if (postData.result) {
                                // the user was logged in
                                window.location.href = global.domain;
                            } else {
                                // the user could not be loggedIn
                                window.location.href = data.url;
                            }
                        });


                    }).catch(catchFetchError);
                } // if data.result, then send the post request
                else {
                    // the result was false
                    // that means the user is already logged in or wrong data
                    window.location.href = data.url;
                }

            }) // res.json().then() for GET request
    }).catch(catchFetchError) // this is the initial fetch


} // here ends postRequestToLogin