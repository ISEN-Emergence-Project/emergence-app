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

    insert (req, res) {
        const hash = bcrypt.hashSync(req.body.password, salt);
        return Account
            .create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                passwordHash: hash,
                role: req.body.role,
                isArchived: req.body.isArchived,
                laureatePromo: req.body.laureatePromo
            })
            .then((Account) => {
                res.status(201).json(Account);
            })
            .catch((error) => {
                res.status(400).json(JSON.stringify(error));
            });
    },

    update (req, res) {
        const hash = bcrypt.hashSync(req.body.password, salt);
        return Account
            .update({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                passwordHash: req.body.passwordHash,
                role: req.body.role,
                isArchived: req.body.isArchived,
                resetKey: req.body.resetKey,
                refreshToken: req.body.refreshToken,
                laureatePromo: req.body.laureatePromo
            }, {
                where: {
                    accountId: req.params.id
                }
            })
            .then(([n_lines, account]) => res.status(200).json(account[0]))
            .catch((error) => res.status(400).json(JSON.stringify(error)));
    },

    delete (req, res) {
        return commonsController.delete(req, res, Account);
    },

    getById (req, res) {
        return Account
            .findAll({
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
                return res.status(200).json(account[0]);
            })
            .catch((error) => {
                res.status(400).json(JSON.stringify(error));
            });
    },

    login (req, res) {
        const { username, password } = req.body;

        // Check required parameters
        if (!username) {
            return res.status(400).json({ message: 'missing_required_parameter', info: 'username' });
        }
        if (!password) {
            return res.status(400).json({ message: 'missing_required_parameter', info: 'password' });
        }

        const xsrfToken = crypto.randomBytes(64).toString('hex');

        Account
            .findOne({ where: { username: req.body.username } })
            .then((account) => {
                // Check if account exist
                if (!account){
                    return res.status(403).json({ message: 'Account not found' });
                }

                const checkPassword = bcrypt.compareSync(req.body.password, account.passwordHash);
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
                            username: account.username,
                            accessTokenExpiresIn: config.accessToken.expiresIn,
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
