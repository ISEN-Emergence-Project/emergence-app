const login = require('express').Router();

const accountController = require('../../controllers/accounts');

login.post('/', accountController.login);

module.exports = login;
