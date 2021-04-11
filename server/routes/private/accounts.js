const accounts = require('express').Router();

const accountController = require('../../controllers/account');

// Handle routes
accounts.get('/', accountController.list);
accounts.get('/:id', accountController.getById);
accounts.post('/', accountController.add);

module.exports = accounts;
