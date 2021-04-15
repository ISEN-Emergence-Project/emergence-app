const accounts = require('express').Router();

const accountsController = require('../../controllers/accounts');

// GET routes
accounts.get('/', accountsController.list);
accounts.get('/:id([0-9]+)', accountsController.getById);

// POST routes
accounts.post('/', accountsController.insert);

// PUT routes
accounts.put('/:id([0-9]+)', accountsController.update);

// DELETE routes
accounts.delete('/:id([0-9]+)', accountsController.delete);

module.exports = accounts;
