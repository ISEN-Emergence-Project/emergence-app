const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const config = require('../config');

const Account = require('../models/Account');
const Laureate = require("../models/Laureate");
const Godfather = require("../models/Godfather");

const commonsController = require('./commons');

const salt = bcrypt.genSaltSync(10);
const isDev = process.env.NODE_ENV !== 'production';

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Account);
    },

    listLaureates (req, res) {
        return Laureate
            .findAll({
                include: {
                    model: Account
                }
            })
            .then((laureates) => res.status(200).json(laureates))
            .catch((error) => {
                console.log(error);
                return res.status(500).json({ message: 'Internal error' });
            });
    },

    listGodfathers (req, res) {
        return Godfather
            .findAll({
                include: {
                    model: Account
                }
            })
            .then((laureates) => res.status(200).json(laureates))
            .catch((error) => {
                console.log(error);
                return res.status(500).json({ message: 'Internal error' });
            });
    },

    insert (req, res) {
        const { firstname, lastname, username, email, password, role } = req.body;

        // Check general account fields
        if (!firstname || !lastname || !username || !email || !password || !role) {
            return res.status(400).json({
                message: 'Missing required parameters',
                info: 'Requires: firstname, lastname, username, email, password, role'
            })
        }

        // Check valid role
        if (!['admin', 'laureate', 'godfather'].includes(role)) {
            return res.status(400).json({
                message: 'Role is invalid',
                info: 'Authorized values: admin, laureate, godfather'
            })
        }

        const hash = bcrypt.hashSync(password, salt);
        let values, options, Model;

        // Handle according to role
        if (role === 'laureate') {
            const { studies, promo } = req.body;

            // Check laureate fields
            if (!studies || !promo) {
                return res.status(400).json({
                    message: 'Missing required parameters',
                    info: 'Requires: studies, promo'
                })
            }

            Model = Laureate;

            values = {
                studies: studies,
                promo: promo,
                Account: {
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    email: email,
                    passwordHash: hash,
                    role: role
                }
            }
            options = {
                include: [ Account ]
            }
        }
        else if (role === 'godfather') {
            const { phone } = req.body;

            Model = Godfather;

            values = {
                phone: phone,
                Account: {
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    email: email,
                    passwordHash: hash,
                    role: role
                }
            }
            options = {
                include: [ Account ]
            }
        }
        else if (role === 'admin') {
            Model = Account;

            values = {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                passwordHash: hash,
                role: role
            }
            options = {}
        }

        return Model
            .create(values, options)
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
        const { firstname, lastname, username, email, password, role, isArchived, resetKey, accessToken, refreshToken } = req.body;

        // Check if role sent
        if (role) {
            return res.status(400).json({
                message: 'Role can not be changed.',
                info: 'Delete this account and create a new one to change role.'
            })
        }

        // Create hash, if password not empty
        const hash = (password) ? bcrypt.hashSync(password, salt) : undefined;

        return Account
            .update({
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                passwordHash: hash,
                isArchived: isArchived,
                resetKey: resetKey,
                accessToken: accessToken,
                refreshToken: refreshToken
            }, {
                where: {
                    accountId: req.params.id
                },
                returning: true
            })
            .then(([, account]) => {
                if (!account[0]) {
                    return res.status(404).json({ message: 'Account not found' });
                }
                // Remove passwordHash from response
                account[0].passwordHash = undefined;
                return res.status(200).json(account[0])
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

    delete (req, res) {
        return Account
            .findOne({
                where: {
                    accountId: req.params.id
                }
            })
            .then((account) => {
                if (!account) {
                    return res.status(400).json({
                        message: 'Account not found',
                    });
                }
                return Account
                    .destroy({
                        where: {
                            accountId: req.params.id
                        }
                    })
                    .then(() => res.status(204).json())
                    .catch((error) => {
                        console.log(error);
                        return res.status(500).json({ message: 'Internal error' });
                    });
            })
            .catch((error) => {
                console.log(error);
                return res.status(500).json({ message: 'Internal error' });
            });
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
                res.status(404).json({ message: 'Account not found' });
            });
    },

    getByAccessToken (req, res) {
        return Account
            .findOne({
                where: {
                    accessToken: req.params.token
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
                res.status(404).json({ message: 'Account not found' });
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
                const apiAccessToken = jwt.sign(
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
                const accessToken = crypto.randomBytes(64).toString('hex');
                const refreshToken = crypto.randomBytes(64).toString('hex');

                Account
                    .update({
                        accessToken: accessToken
                    }, {
                        where: { accountId: account.accountId }
                    })
                    .then(() => {
                        res.cookie('access_token', apiAccessToken, {
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
                            accessToken: accessToken,
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
        return res.status(500).json('Not implemented');
    }
};
