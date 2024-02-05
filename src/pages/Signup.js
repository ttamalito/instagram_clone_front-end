

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