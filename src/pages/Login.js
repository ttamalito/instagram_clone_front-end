


import '../styles/authenticationStyles/authenticationForm.css'

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
    const loginForm = <form>
            <div className={'authentication-form-label-input'}>

                {(invalidCredentials) &&  <p>No user with that email, please try again!</p>}

                {(invalidPassword) && <p>Credentials do not match, please try again!</p>}
                <label >E-Mail</label>
                <input type="email" id="user-email" name="email" />
            </div>
            <div className={'authentication-form-label-input'}>
                <label form="username">Username</label>
                <input type="text" id="username" name="username"/>
            </div>
            <div className={'authentication-form-label-input'}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" minLength="6" />
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