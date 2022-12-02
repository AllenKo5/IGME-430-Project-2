const helper = require('./helper.js');

// submits password data
const handlePassword = (e) => {
    e.preventDefault();
    helper.hideError();

    const currentPass = e.target.querySelector('#currentPass').value;
    const newPass = e.target.querySelector('#newPass').value;
    const newPass2 = e.target.querySelector('#newPass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    helper.sendPost(e.target.action, { currentPass, newPass, newPass2, _csrf });

    return false;
};

const handlePremium = (e) => {
    e.preventDefault();
    helper.hideError();
    
    const _csrf = e.target.querySelector('#_csrf').value;

    helper.sendPost(e.target.action, { _csrf });

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
            <label htmlFor="currentPass">Current Password</label>
            <input id="currentPass" type="password" name="currentPass" placeholder="Current Password" />
            <label htmlFor="newPass">New Password</label>
            <input id="newPass" type="password" name="newPass" placeholder="New Password" />
            <label htmlFor="newPass2">Confirm Password</label>
            <input id="newPass2" type="password" name="newPass2" placeholder="Confirm New Password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="submitPass" type="submit" value="Change Password" />
        </form>
    );
};

// premium option component
const PremiumButton = (props) => {
    return (
        <form id="premiumButton"
            name="premiumButton"
            onSubmit={handlePremium}
            action="/premium"
            method="POST"
            className="premiumButton"
        >
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="submitPremium" type="submit" value="Activate Premium" />
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

    ReactDOM.render(
        <PremiumButton csrf={data.csrfToken} />,
        document.getElementById('premium')
    );
};

window.onload = init;