const login = require('express').Router;

const accountController = require('../../controllers/account');

login.get('/', accountController.login);

module.exports = login;
