const login = require('express').Router();

const accountController = require('../../controllers/account');

login.post('/', accountController.login);

module.exports = login;
