const helper = require('./helper.js');
const utils = require('./utils.jsx');

// submits message data
const handleMessage = (e) => {
    e.preventDefault();
    helper.hidePopup();

    const msg = e.target.querySelector('#msgContent').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!msg) {
        helper.handlePopup('Message is required!');
        return false;
    }

    helper.sendPost(e.target.action, { msg, _csrf }, loadMessagesFromServer);

    return false;
};

// message form component
const MessageForm = (props) => {
    return (
        <form id="msgForm"
            name="msgForm"
            onSubmit={handleMessage}
            action="/msg"
            method="POST"
            className="msgForm"
        >
            <label htmlFor="message">Welcome, <b>{props.username}</b>! What's on your mind? </label><br />
            <input id="msgContent" type="text" name="message" placeholder="Message" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="submitMessage" type="submit" value="Chirp" />
        </form>
    );
};

// message list component
const MessageList = (props) => {
    // if there are no messages
    if (props.messages.length === 0) {
        return (
            <div className="msgList">
                <h3 className="emptyMessage">No Messages Yet!</h3>
            </div>
        );
    }

    // displays all messages in reverse chronological order
    const messageNodes = props.messages.map(message => {
        return (
            <div key={message._id} className="message">
                <h3 className="msgAuthor">{message.author}</h3>
                <p className="msgContent">{message.msg}</p>
                <p className="msgDate">Posted: {message.createdDate}</p>
            </div>
        );
    }).reverse();

    return (
        <div className="msgList">
            {messageNodes}
        </div>
    );
};

// fetches all messages stored in database
const loadMessagesFromServer = async () => {
    const msgResponse = await fetch('/getMessages');
    const msgData = await msgResponse.json();

    ReactDOM.render(
        <MessageList messages={msgData.messages} />,
        document.getElementById('messages')
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
        <MessageForm username={accountData.account.username} csrf={data.csrfToken} />,
        document.getElementById('makeMessage')
    );

    ReactDOM.render(
        <MessageList messages={[]} />,
        document.getElementById('messages')
    );

    loadMessagesFromServer();
};

window.onload = init;