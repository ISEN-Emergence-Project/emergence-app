const axios = require('axios');

const hostname = process.env.API_HOSTNAME || '';

const connectApi = (username, password) => {
    axios
        .post(hostname + '/api/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            username,
            password
        })
        .then(res => {
            localStorage.setItem('xsrfToken', JSON.stringify(res.data.xsrfToken));
            return res;
        })
        .catch((err) => console.error(err));
}

const fetchApi = (method, url, body) => {

    let xsrfToken = localStorage.getItem('xsrfToken');
    // Check valid xsrf token
    if (!xsrfToken) {
        return console.error('Missing xsrf token. Aborting request.')
    }
    xsrfToken = JSON.parse(xsrfToken);

    method = method.toLowerCase();
    // Check valid method
    if (!method in ['get', 'post', 'put', 'delete']) {
        return 'Method can only be GET, POST, PUT, DELETE';
    }

    const config = {
        method: method,
        url: hostname + url,
        headers: {
            'Content-Type': 'application/json',
            'x-xsrf-token': xsrfToken
        },
        withCredentials: true,
        xsrfHeaderName: 'x-xsrf-token'
    }

    // Execute and return request
    return axios(config);
}

module.exports = {
    connectApi,
    fetchApi
}
