// displays error message
const handleError = (message) => {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('error').classList.remove('hidden');
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
    document.getElementById('error').classList.add('hidden');

    // if there was an error in getting a response
    if (result.error) {
        handleError(result.error);
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

// hides error message
const hideError = () => {
    document.getElementById('error').classList.add('hidden');
};

module.exports = {
    handleError,
    sendPost,
    hideError,
};