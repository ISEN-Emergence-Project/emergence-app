const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const config = require('../config')

const { Account } = require('../models');

const salt = bcrypt.genSaltSync(10);

/* FUNCTIONS */

const login = (req, res) => {
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
                    role: account.role
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
                        secure: true,
                        maxAge: config.accessToken.expiresIn,
                        path: '/'
                    });

                    res.cookie('refresh_token', refreshToken, {
                        httpOnly: true,
                        secure: true,
                        path: '/api/token'
                    });

                    res.status(200).json({
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
}

const list = (req, res) => {
    return Account
        .findAll()
        .then((accounts) => res.status(200).json({'accounts': [accounts]}))
        .catch((error) => res.status(400).json(error));
}

const getById = (req, res) => {
    return Account
        .findById(req.params.id)
        .then((account) => {
            if (!account) {
                return res.status(404).json({
                    message: 'Account Not Found',
                });
            }
            return res.status(200).json(account);
        })
        .catch((error) => {
            res.status(400).json(JSON.stringify(error));
        });
}

const add = (req, res) => {
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
            resetKey: req.body.resetKey
        })
        .then((Account) => {
            res.status(201).json(Account);
        })
        .catch((error) => {
            res.status(400).json(JSON.stringify(error));
        });
}

const update = (req, res) => {
    return Account
        .findById(req.params.id)
        .then(account => {
            if (!account) {
                return res.status(404).json({
                    message: 'Account Not Found',
                });
            }
            return Account
                .update({
                    password: req.body.password,
                })
                .then(() => res.status(200).json(account))
                .catch((error) => res.status(400).json(JSON.stringify(error)));
        })
        .catch((error) => res.status(400).json(JSON.stringify(error)));
}

const suppr = (req, res) => {
    return Account
        .findById(req.params.id)
        .then(account => {
            if (!account) {
                return res.status(400).json({
                    message: 'Account Not Found',
                });
            }
            return Account
                .destroy()
                .then(() => res.status(204).json())
                .catch((error) => res.status(400).json(JSON.stringify(error)));
        })
        .catch((error) => res.status(400).json(JSON.stringify(error)));
}

const logout = (req, res) => {
    return res.json('Not implemented');
}

module.exports = {
    login,
    logout,
    list,
    getById,
    add,
    update,
    suppr,
};
