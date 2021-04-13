const accounts = require('express').Router();

const commonsController = require('../../controllers/commons');
const accountsController = require('../../controllers/accounts');

const Account = require('../../models/Account');

// GET routes
accounts.get('/', (req, res) => {
    return commonsController.list(req, res, Account);
});
accounts.get('/:id', (req, res) => {
    return commonsController.getById(req, res, Account);
});

// POST routes
accounts.post('/', (req, res) => {
    return commonsController.insert(req, res, Account);
});

// PUT routes
accounts.put('/:id', (req, res) => {
    return commonsController.update(req, res, Account);
});

// DELETE routes
accounts.delete('/:id', (req, res) => {
    return commonsController.delete(req, res, Account);
});

module.exports = accounts;
