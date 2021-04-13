const preselections = require('express').Router();

const preselectionsController = require('../../controllers/preselections');

// GET routes
preselections.get('/', preselectionsController.list);
preselections.get('/:id', preselectionsController.getById);

// POST routes
preselections.post('/', preselectionsController.insert);

// PUT routes
preselections.put('/:id', preselectionsController.update);

// DELETE routes
preselections.delete('/:id', preselectionsController.delete);

module.exports = preselections;
