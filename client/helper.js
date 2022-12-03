// displays popup message
const handlePopup = (message) => {
    document.getElementById('popupMessage').textContent = message;
    document.getElementById('popupWindow').classList.remove('hidden');
};

// fetches data from url and handles it appropriately
const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    hidePopup();

    // the the response has a popup
    if (result.popup) {
        handlePopup(result.popup);
    }

    // if the response has a redirect
    if (result.redirect) {
        window.location = result.redirect;
    }

    // handle response
    if (handler) {
        handler(result);
    }
};

// hides popup message
const hidePopup = () => {
    document.getElementById('popupWindow').classList.add('hidden');
};

module.exports = {
    handlePopup,
    sendPost,
    hidePopup,
};