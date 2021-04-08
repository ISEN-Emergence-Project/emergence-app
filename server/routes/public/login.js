const login = require('express').Router;

const accountController = require('../../controllers/Account');

login.get('/', accountController.login);

module.exports = login;
