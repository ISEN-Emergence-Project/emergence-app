const jwt = require('jsonwebtoken');
const config = require('../config');
const { Account } = require("../models");

const authJwt = (req, res, next) => {
    const { headers } = req;
    // Check valid headers
    if (!headers || !headers.authorization) {
        return res.status(401).json({
            message: 'Missing Authorization header'
        });
    }

    const [scheme, token] = headers.authorization.split(' ');
    // Check valid scheme and token
    if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) {
        return res.status(401).json({
            message: 'Header format is Authorization: Bearer token'
        });
    }

    jwt.verify(token, config.accessToken.secret, (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        Account
            .findOne({ where: { accountId: decoded.sub } })
            .then((account) => {
                // Check account exists
                if (!account) {
                    return res.status(401).send({ message: 'Account not found' });
                }
                // Save account
                req.account = account;

                return next();
            })
            .catch((err) => res.status(401).json({ message: 'Unauthorized', err }));
    });
}

module.exports = authJwt;
