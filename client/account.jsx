const helper = require('./helper.js');

// submits password data
const handlePassword = (e) => {
    e.preventDefault();
    helper.hideError();

    const newPass = e.target.querySelector('#newPass').value;
    const newPass2 = e.target.querySelector('#newPass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    helper.sendPost(e.target.action, { newPass, newPass2, _csrf });

    return false;
};

// password change component
const PasswordChange = (props) => {
    return (
        <form id="passForm"
            name="passForm"
            onSubmit={handlePassword}
            action="/pass"
            method="POST"
            className="passForm"
        >
            <label htmlFor="newPass">New Password</label>
            <input id="newPass" type="password" name="newPass" placeholder="New Password" />
            <label htmlFor="newPass2">Confirm Password</label>
            <input id="newPass2" type="password" name="newPass2" placeholder="Confirm New Password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="submitPass" type="submit" value="Change Password" />
        </form>
    );
};

// init function
const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <PasswordChange csrf={data.csrfToken} />,
        document.getElementById('changePassword')
    );
};

window.onload = init;