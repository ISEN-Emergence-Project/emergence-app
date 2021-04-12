const hostname = 'https://localhost:5000'

const connectApi = (username, password) => {
    fetch(hostname + '/api/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    }).then(res => console.log(res));
}

const fetchApi = (method, url, body) => {
    method = method.toUpperCase();
    // Check valid method
    if (!method in ['GET', 'POST', 'PUT', 'DELETE']) {
        return 'Method can only be GET, POST, PUT, DELETE';
    }

    const api_access_token = localStorage.getItem('api-access-token');
    const authorization_header = (api_access_token !== undefined) ? {} : {'Authorization': 'Bearer ' + api_access_token};
    const req_body = (method === 'GET') ? {} : {body: JSON.stringify(body)};

    let options = {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            authorization_header
        },
        req_body
    };

    // Execute and return request
    return fetch(hostname + url, options);
}

module.exports = {
    connectApi,
    fetchApi
}
