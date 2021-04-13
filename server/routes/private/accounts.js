const accounts = require('express').Router();

const accountsController = require('../../controllers/accounts');

// GET routes
accounts.get('/', accountsController.list);
accounts.get('/:id(\d+)', accountsController.getById);

// POST routes
accounts.post('/', accountsController.insert);

// PUT routes
accounts.put('/:id(\d+)', accountsController.update);

// DELETE routes
accounts.delete('/:id(\d+)', accountsController.delete);

module.exports = accounts;
