const preselections = require('express').Router();

const preselectionsController = require('../../controllers/preselections');

// GET routes
preselections.get('/', preselectionsController.list);
preselections.get('/:id(\d+)', preselectionsController.getById);

// POST routes
preselections.post('/', preselectionsController.insert);

// PUT routes
preselections.put('/:id(\d+)', preselectionsController.update);

// DELETE routes
preselections.delete('/:id(\d+)', preselectionsController.delete);

module.exports = preselections;
