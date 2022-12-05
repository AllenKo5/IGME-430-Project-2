const helper = require('./helper.js');
const utils = require('./utils.jsx');

// submits password data
const handlePassword = (e) => {
    e.preventDefault();
    helper.hidePopup();

    const currentPass = e.target.querySelector('#currentPass').value;
    const newPass = e.target.querySelector('#newPass').value;
    const newPass2 = e.target.querySelector('#newPass2').value;
    const _csrf = e.target.querySelector('#_csrf1').value;

    helper.sendPost(e.target.action, { currentPass, newPass, newPass2, _csrf });

    return false;
};

// changes premium state
const handlePremium = (e) => {
    e.preventDefault();
    helper.hidePopup();

    const _csrf = e.target.querySelector('#_csrf2').value;

    helper.sendPost(e.target.action, { _csrf }, init);

    return false;
};

// password change component
const PasswordChange = (props) => {
    return (
        <div id="passWrapper">
            <h3 id="passTitle">Change Password</h3>
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
                <input id="_csrf1" type="hidden" name="_csrf" value={props.csrf} />
                <input className="submitPass" type="submit" value="Change Password" />
            </form>
        </div>
    );
};

// premium button component
const PremiumForm = (props) => {
    if (props.premium) {
        return (
            <div id="premiumWrapper">
                <h3 id="premiumTitle">Premium</h3>
                <p id="premiumText">Buy Chirp Premium to disable ads!</p>
                <form id="premiumForm"
                    name="premiumForm"
                    onSubmit={handlePremium}
                    action="/premium"
                    method="POST"
                    className="premiumForm"
                >
                    <input id="_csrf2" type="hidden" name="_csrf" value={props.csrf} />
                    <input className="submitPremium" type="submit" value="Deactivate Premium" />
                </form>
            </div>
        );
    }
    return (
        <div id="premiumWrapper">
            <h3 id="premiumTitle">Premium</h3>
            <p id="premiumText">Buy Chirp Premium to disable ads!</p>
            <form id="premiumForm"
                name="premiumForm"
                onSubmit={handlePremium}
                action="/premium"
                method="POST"
                className="premiumForm"
            >
                <input id="_csrf2" type="hidden" name="_csrf" value={props.csrf} />
                <input className="submitPremium" type="submit" value="Activate Premium" />
            </form>
        </div>
    );
};

// init function
const init = async () => {
    utils.accountInit();

    const response = await fetch('/getToken');
    const data = await response.json();

    const account = await fetch('/getAccountData');
    const accountData = await account.json();

    ReactDOM.render(
        <PasswordChange csrf={data.csrfToken} />,
        document.getElementById('changePassword')
    );

    ReactDOM.render(
        <PremiumForm premium={accountData.account.premium} csrf={data.csrfToken} />,
        document.getElementById('premium')
    );
};

window.onload = init;