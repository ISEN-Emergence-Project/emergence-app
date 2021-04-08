const logout = require('express').Router;

const accountController = require('../../controllers/account');

logout.get('/', accountController.logout);

module.exports = logout;
