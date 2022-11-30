const helper = require('./helper.js');

// 

// account window component
const AccountWindow = (props) => {
    return (
        <form id=""
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