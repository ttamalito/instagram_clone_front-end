

import '../styles/authenticationStyles/authenticationForm.css'
import global from "../globalVars";
import {Form} from "react-router-dom";
import createUrlParams
    from "../utils/createUrlParams";


/**
 * Creates the /signup page
 * @constructor
 */
export default function Signup() {

    const signupHeader = <h1>Create a New Account</h1>
    const signupForm = <form onSubmit={onSubmitHandler}>
            <div className={'authentication-form-label-input'}>
                <input type="email" id="email" name="email" placeholder={'E-Mail'}/>
            </div>
            <div className={'authentication-form-label-input'}>
                <input type="email" id="confirm-email" name="confirmEmail" placeholder={'Confirm E-Mail'}/>
            </div>

            <div className={'authentication-form-label-input'}>

                <input type="password" id="password" name="password" minLength="6" placeholder={'Password'} />
            </div>
                <div className={'authentication-form-label-input'}>
                    <input type="text" id="fullname" name="fullname" placeholder={'Full Name'} />
                </div>

                <div className={'authentication-form-label-input'}>

                    <input type="text" id="username" name="username" placeholder={'Username'}/>
                </div>

                <div className={'authentication-form-label-input'}>
                    <input type="text" id="bio" name="bio" placeholder={'Biography'} />
                </div>

                <button >Create Account</button>
                <p id="switch-form">
                    <a href="/login">Login instead</a>
                </p>
    </form>

    return (<div id={'signup-form'} className={'authentication-form'}>
        {signupHeader}
        {signupForm}
    </div>)
}


/**
 * Contains the logic to submit the form data as a post request to the backend
 * @param {Event} event
 */
function onSubmitHandler(event) {
    // prevent the default behaviour
    event.preventDefault();
    // get the data in url form, so that it can be sent
   const urlData = createUrlParams(event.nativeEvent.srcElement);

   // make the first get request for the csrf token
    fetch(`${global.backend}/signup`, {
        method: "GET",
        credentials: 'include'
    }).then(getResponse => {
        // check if the csrf token was sent
        getResponse.json().then(getData => {
            if (getData.result) {
                // there must be a token
                const csrf = getData.csrf;
                // send the post request
                fetch(`${global.backend}/signup?_csrf=${csrf}`, {
                    method: 'POST',
                    credentials: 'include',
                    body: urlData
                }).then(postResponse => {
                    // check the response
                    postResponse.json().then(postData => {
                        // check if the operation was successful
                        if (!postData.result) {
                            // it was not successful
                            window.location.href = `${global.domain}/signup`;
                        } else {
                            // the operation was successful
                            window.location.href = `${global.domain}/login`;
                        } // end of if-else
                    }) // end of postData
                }) // end of postResponse
            } // if (getData.result)
        }) // end of getData
    }) // end of getResponse
} // end of onSubmitHandler

