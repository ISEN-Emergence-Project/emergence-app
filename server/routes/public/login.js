/**
 * API LOGIN ROUTER
 * Handle all /api/login requests
 */

const login = require('express').Router();

// Include controller
const accountController = require('../../controllers/accounts');

// POST routes
login.post('/', accountController.login);

module.exports = login;
