const helper = require('./helper.js');

const AdWindow = (props) => {
    return (
        <div id="ad">
            ADS GO HERE
        </div>
    );
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    const account = await fetch('/getAccountData');
    const accountData = await account.json();

    ReactDOM.render(
        <AdWindow premium={accountData.account.premium} csrf={data.csrfToken} />,
        document.getElementById('ads')
    );
};

module.exports = {
    init,
}