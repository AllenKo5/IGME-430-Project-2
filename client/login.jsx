const helper = require('./helper.js');
const utils = require('./utils.jsx');

// submits login data
const handleLogin = (e) => {
    e.preventDefault();
    helper.hidePopup();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    helper.sendPost(e.target.action, { username, pass, _csrf });

    return false;
};

// submits signup data
const handleSignup = (e) => {
    e.preventDefault();
    helper.hidePopup();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    helper.sendPost(e.target.action, { username, pass, pass2, _csrf });

    return false;
};

// login window component
const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Log In" />
        </form>
    );
};

// signup window component
const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign Up" />
        </form>
    );
};

// init function
const init = async () => {
    utils.loginInit();

    const response = await fetch('/getToken');
    const data = await response.json();

    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        helper.hidePopup();
        ReactDOM.render(
            <LoginWindow csrf={data.csrfToken} />,
            document.getElementById('content')
        );
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        helper.hidePopup();
        ReactDOM.render(
            <SignupWindow csrf={data.csrfToken} />,
            document.getElementById('content')
        );
        return false;
    });

    ReactDOM.render(
        <LoginWindow csrf={data.csrfToken} />,
        document.getElementById('content')
    );
};

window.onload = init;