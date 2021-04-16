const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const config = require('../config');

const { Account } = require('../models');

const commonsController = require('./commons');

const salt = bcrypt.genSaltSync(10);
const isDev = process.env.NODE_ENV !== 'production';

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Account);
    },

    listLaureates (req, res) {
        return Account
            .findAll({
                where: {
                    role: 'laureate'
                }
            })
            .then((entities) => res.status(200).json(entities))
            .catch((error) => res.status(400).json(error));
    },

    insert (req, res) {
        const { firstname, lastname, username, email, password, role, laureatePromo } = req.body;

        if (!firstname || !lastname || !username || !email || !password || !role || !laureatePromo) {
            res.status(400).json({
                message: 'Missing required parameters',
                info: 'Requires: firstname, lastname, username, email, password, role, laureatePromo'
            })
        }

        const hash = bcrypt.hashSync(password, salt);
        const promo = new Date(parseInt(laureatePromo),1,1);

        return Account
            .create({
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                passwordHash: hash,
                role: role,
                laureatePromo: promo
            })
            .then((Account) => {
                res.status(201).json(Account);
            })
            .catch((error) => {
                console.log(error);
                if (error.name === "SequelizeUniqueConstraintError") {
                    return res.status(400).json(error);
                } else {
                    return res.status(500).json({ message: 'Internal Error' });
                }
            });
    },

    update (req, res) {
        const { firstname, lastname, username, email, password, role, isArchived, resetKey, refreshToken, laureatePromo } = req.body;

        // Create hash, if password not empty
        const hash = (password) ? bcrypt.hashSync(password, salt) : undefined;

        return Account
            .update({
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                passwordHash: hash,
                role: role,
                isArchived: isArchived,
                resetKey: resetKey,
                refreshToken: refreshToken,
                laureatePromo: laureatePromo
            }, {
                where: {
                    accountId: req.params.id
                },
                returning: true
            })
            .then(([, account]) => res.status(200).json(account[0]))
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    delete (req, res) {
        Account
            .findOne({
                where: {
                    accountId: req.params.id
                }
            })
            .then(entity => {
                if (!entity) {
                    return res.status(400).json({
                        message: 'Model Not Found',
                    });
                }
                return Account
                    .destroy()
                    .then(() => res.status(204).json())
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    },

    getById (req, res) {
        return Account
            .findOne({
                where: {
                    accountId: req.params.id
                }
            })
            .then((account) => {
                if (!account) {
                    return res.status(404).json({
                        message: 'Account Not Found',
                    });
                }
                return res.status(200).json(account);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    getByAccessToken (req, res) {
        return Account
            .findOne({
                where: {
                    refreshToken: req.params.token
                }
            })
            .then((account) => {
                if (!account) {
                    return res.status(404).json({
                        message: 'Account Not Found',
                    });
                }
                return res.status(200).json(account);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    login (req, res) {
        const { email, password } = req.body;

        // Check required parameters
        if (!email) {
            return res.status(400).json({ message: 'missing_required_parameter', info: 'email' });
        }
        if (!password) {
            return res.status(400).json({ message: 'missing_required_parameter', info: 'password' });
        }

        const xsrfToken = crypto.randomBytes(64).toString('hex');

        Account
            .findOne({ where: { email } })
            .then((account) => {
                // Check if account exist
                if (!account){
                    return res.status(403).json({ message: 'Account not found' });
                }

                const checkPassword = bcrypt.compareSync(password, account.passwordHash);
                // Check if password match hash
                if (!checkPassword) {
                    return res.status(403).json({ message: 'Wrong password', });
                }

                // Create JWT tokens
                const accessToken = jwt.sign(
                    {
                        role: account.role,
                        xsrfToken
                    },
                    config.accessToken.secret,
                    {
                        algorithm: config.accessToken.algorithm,
                        expiresIn: config.accessToken.expiresIn,
                        subject: account.accountId.toString()
                    }
                );
                const refreshToken = crypto.randomBytes(64).toString('hex');

                Account
                    .update({
                        refreshToken
                    }, {
                        where: { accountId: account.accountId }
                    })
                    .then(() => {
                        res.cookie('access_token', accessToken, {
                            httpOnly: true,
                            secure: !isDev,
                            maxAge: config.accessToken.expiresIn * 1000, // in milliseconds - 24h
                            path: '/'
                        });

                        res.cookie('refresh_token', refreshToken, {
                            httpOnly: true,
                            secure: !isDev,
                            path: '/'
                        });

                        return res.status(200).json({
                            message: 'Success',
                            accessToken: refreshToken,
                            xsrfToken
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.status(500).json({message: 'An error occurred', err});
                    });
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    logout (req, res) {
        return res.json('Not implemented');
    }
};
