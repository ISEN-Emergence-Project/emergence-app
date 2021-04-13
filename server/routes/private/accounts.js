const accounts = require('express').Router();

const accountsController = require('../../controllers/accounts');

// GET routes
accounts.get('/', accountsController.list);
accounts.get('/:id', accountsController.getById);

// POST routes
accounts.post('/', accountsController.insert);

// PUT routes
accounts.put('/:id', accountsController.update);

// DELETE routes
accounts.delete('/:id', accountsController.delete);

module.exports = accounts;
