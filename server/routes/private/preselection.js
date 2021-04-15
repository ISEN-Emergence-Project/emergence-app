const preselections = require('express').Router();

const preselectionsController = require('../../controllers/preselections');

// GET routes
preselections.get('/', preselectionsController.list);
preselections.get('/:id([0-9]+)', preselectionsController.getById);

// POST routes
preselections.post('/', preselectionsController.insert);

// PUT routes
preselections.put('/:id([0-9]+)', preselectionsController.update);

// DELETE routes
preselections.delete('/:id([0-9]+)', preselectionsController.delete);

module.exports = preselections;
