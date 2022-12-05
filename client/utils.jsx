const helper = require('./helper.js');

// popup window for errors/updates
const PopupWindow = (props) => {
    return (
        <div id="popupWindow" className='hidden'>
            <h3><span id="popupMessage"></span></h3>
            <button id="popupButton">X</button>
        </div>
    );
};

// ad window that appears based on premium status
const AdWindow = (props) => {
    if (props.premium) {
        return (
            <div id="ad" className="hidden">
                ADS GO HERE
            </div>
        );
    }
    return (
        <div id="ad">
            ADS GO HERE
        </div>
    );
};

// init function for login page
const loginInit = () => {
    ReactDOM.render(
        <PopupWindow />,
        document.getElementById('popup')
    );

    ReactDOM.render(
        <AdWindow premium={false} />,
        document.getElementById('ads')
    );
}

// init function for other pages
const accountInit = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    const account = await fetch('/getAccountData');
    const accountData = await account.json();

    ReactDOM.render(
        <PopupWindow />,
        document.getElementById('popup')
    );

    const popupButton = document.querySelector('#popupButton');
    popupButton.addEventListener('click', helper.hidePopup);

    if (accountData) {
        ReactDOM.render(
            <AdWindow premium={accountData.account.premium} csrf={data.csrfToken} />,
            document.getElementById('ads')
        );
    } else {
        ReactDOM.render(
            <AdWindow premium={false} csrf={data.csrfToken} />,
            document.getElementById('ads')
        );
    }
};

module.exports = {
    loginInit,
    accountInit,
}