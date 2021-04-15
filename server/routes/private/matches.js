const matches = require('express').Router();

const matchesController = require('../../controllers/matches');

// GET routes
matches.get('/', matchesController.list);
matches.get('/:id([0-9]+)', matchesController.getById);

// POST routes
matches.post('/', matchesController.insert);

// PUT routes
matches.put('/:id([0-9]+)', matchesController.update);

// DELETE routes
matches.delete('/:id([0-9]+)', matchesController.delete);

module.exports = matches;
