const phases = require('express').Router();

const phasesController = require('../../controllers/phases');

// GET routes
phases.get('/', phasesController.list);
phases.get('/:id([0-9]+)', phasesController.getById);

module.exports = phases;
