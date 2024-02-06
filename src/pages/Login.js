


import '../styles/authenticationStyles/authenticationForm.css'
import {useEffect, useRef, useState} from "react";

import global from "../globalVars";

// import utils
import createUrlParams
    from "../utils/createUrlParams";

/**
 * Creates the Login Page
 * @return {JSX.Element}
 * @constructor
 */
export default function Login() {
    const csrf = useRef();
    const [csrfToken, setCsrfToken] = useState();
    // fetch the csrf token from the server
    useEffect(()=>{


    }, [])
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
                        res.json().then(data=>console.log(data));
                        // check if redirected is needed
                        if (res.redirected)
                            window.location.href = res.url;
                    });
                } // if data.result, then send the post request
                else {
                    // the result was false
                    window.location.href = global.domain;
                }

                }

            ) // res.json().then() for GET request
    }) // initial fetch



} // here ends postRequestToLogin