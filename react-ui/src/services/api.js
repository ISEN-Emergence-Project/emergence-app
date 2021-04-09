
const fetchApi = (method, url, body, additional_headers) => {
    method = method.toUpperCase();

    if (!method in ['GET', 'POST', 'PUT', 'DELETE']) {
        return 'Method can only be GET, POST, PUT, DELETE';
    }

    let options = {
        method: method,
        headers: {
            'content-type': 'application/json',
            'x-access-token': localStorage.getItem('api-token'),
            additional_headers
        }
    };
    options = (method == 'GET') ? options : options = { options, body: JSON.stringify(body) };

    // Execute and return request
    return fetch(url, options);
}

module.exports = {
    fetchApi
}
