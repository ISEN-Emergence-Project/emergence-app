const jwt = require('jsonwebtoken');
const config = require('../config');
const { Account } = require("../models/Account");

const authJwt = (req, res, next) => {
    // temporary auto accept authorization
    return next()

    const { cookies, headers } = req;

    // Check valid cookies
    if (!cookies || !cookies.access_token) {
        return res.status(401).json({ message: 'Missing token in cookies' });
    }
    const accessToken = cookies.access_token;

    // Check valid headers
    if (!headers || !headers['x-xsrf-token']) {
        return res.status(401).json({ message: 'Missing XSRF token in headers' });
    }
    const xsrfToken = headers['x-xsrf-token'];

    // JWT verify access token
    jwt.verify(accessToken, config.accessToken.secret, (err, decoded) => {

        // Check valid token
        if (err) {
            return res.status(400).json({ message: 'Invalid token', error: err });
        }

        // Check if xsrfToken correspond to JWT payload
        if (xsrfToken !== decoded.xsrfToken) {
            return res.status(401).json({ message: 'Bad xsrf token' })
        }

        Account
            .findOne({ where: { accountId: decoded.sub } })
            .then((account) => {
                // Check account exists
                if (!account) {
                    return res.status(401).send({ message: 'Account not found' });
                }
                // Save account in request
                req.account = account;

                console.log('> Authorized access to: ' + req.originalUrl);
                return next();
            })
            .catch((err) => res.status(401).json({ message: 'Unauthorized', err }));
    });
}

module.exports = authJwt;
