

import '../styles/authenticationStyles/authenticationForm.css'



/**
 * Creates the /signup page
 * @constructor
 */
export default function Signup() {

    const signupHeader = <h1>Create a New Account</h1>
    const signupForm = <form>
        <input type="hidden" name="_csrf" value="<%= locals.csrfToken %>"/>
            <div className={'authentication-form-label-input'}>
                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email" name="email" />
            </div>
            <div className={'authentication-form-label-input'}>
                <label htmlFor="confirm-email">Confirm E-Mail</label>
                <input type="email" id="confirm-email" name="confirmEmail" />
            </div>

            <div className={'authentication-form-label-input'}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" minLength="6" />
            </div>
                <div className={'authentication-form-label-input'}>
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullname" name="fullname" />
                </div>

                <div className={'authentication-form-label-input'}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" />
                </div>

                <div className={'authentication-form-label-input'}>
                    <label htmlFor="bio">Biography</label>
                    <input type="text" id="bio" name="bio" />
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