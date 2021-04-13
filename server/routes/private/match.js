const matches = require('express').Router();

const matchesController = require('../../controllers/matches');

// GET routes
matches.get('/', matchesController.list);
matches.get('/:id', matchesController.getById);

// POST routes
matches.post('/', matchesController.insert);

// PUT routes
matches.put('/:id', matchesController.update);

// DELETE routes
matches.delete('/:id', matchesController.delete);

module.exports = matches;
