/**
 * API AUTHENTICATION MIDDLEWARE
 * Check if a user is connected
 * Authorize or deny API call
 */

const dotenv = require("dotenv");

// Configure .env file support
dotenv.config()

const jwt = require('jsonwebtoken');
const config = require('../config');
const Account = require("../models/Account");

const isDev = process.env.NODE_ENV === 'dev';

// Authenticate a user with cookies
const authJwt = (req, res, next) => {
    const { cookies } = req;

    // TEMP auto auth
    if (isDev) {
        return next();
    }

    // Check valid cookies
    if (!cookies || !cookies.access_token) {
        return res.status(401).json({ message: 'Missing token in cookies' });
    }

    const accessToken = cookies.access_token;

    // JWT verify access token
    jwt.verify(accessToken, config.accessToken.secret, (err, decoded) => {

        // Check valid token
        if (err) {
            return res.status(400).json({ message: 'Invalid token', error: err });
        }

        // Check if account exists
        Account
            .findOne({
                where: {
                    accountId: decoded.sub
                }
            })
            .then((account) => {
                // Check account exists
                if (!account) {
                    return res.status(401).send({ message: 'Account not found' });
                }

                // Save account in request for future use in controllers
                req.account = account;

                console.log('> Authorized access to: ' + req.originalUrl +' to accountId: '+ account.accountId);
                return next();
            })
            .catch((err) => res.status(401).json({ message: 'Unauthorized', err }));
    });
}

module.exports = authJwt;
