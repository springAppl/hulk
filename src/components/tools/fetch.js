import {message} from 'antd';
function checkHttpCode(data) {
    if (data.httpCode) {
        var error = new Error(data.message)
        throw error
    } else {
        return data;
    }
}

function parseJSON(response) {
    return response.json();
}

let get = (url, resolve, headers) => {
    return fetch(url, {
        credentials: 'same-origin',
        headers: headers
    })
    .then(checkRedirect)
    .then(parseJSON)
    .then(checkHttpCode)
    .then(resolve)
    .catch(error => {
        message.error(error.message);
    });
}

let post = (url, data, resolve) => {
    return fetch(url, {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        method: 'POST'
    })
    .then(checkRedirect)
    .then(parseJSON)
    .then(checkHttpCode)
    .then(resolve)
    .catch(error => {
        message.error(error.message);
    });
}
let put = (url, data, resolve) => {
    return fetch(url, {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        method: 'PUT'
    })
    .then(checkRedirect)
    .then(parseJSON)
    .then(checkHttpCode)
    .then(resolve)
    .catch(error => {
        message.error(error.message);
    });
}
let postURL = (url, resolve, headers) => {
    return fetch(url, {
        credentials: 'same-origin',
        method: 'POST'
    })
    .then(checkRedirect)
    .then(parseJSON)
    .then(checkHttpCode)
    .then(resolve)
    .catch(error => {
        message.error(error.message);
    });
}
let checkRedirect = (response) => {
    if (response.redirected) {
        return window.location = response.url;
    } else {
        return response;
    }
    return response;
}
export {get, post, put, postURL};