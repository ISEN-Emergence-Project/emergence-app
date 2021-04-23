const phases = require('express').Router();

const phasesController = require('../../controllers/phases');

// GET routes
phases.get('/', phasesController.list);
phases.get('/:id([0-9]+)', phasesController.getById);

// PUT routes
phases.put('/:id([0-9]+)', phasesController.update);

module.exports = phases;
