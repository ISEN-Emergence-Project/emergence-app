/**
 * API LOGOUT ROUTER
 * Handle all /api/logout requests
 */

const logout = require('express').Router();

const accountController = require('../../controllers/accounts');

logout.get('/', accountController.logout);

module.exports = logout;
