const meetings = require('express').Router();

const meetingsController = require('../../controllers/meetings');

// GET routes
meetings.get('/', meetingsController.list);
meetings.get('/:id(\d+)', meetingsController.getById);

// POST routes
meetings.post('/', meetingsController.insert);

// PUT routes
meetings.put('/:id(\d+)', meetingsController.update);

// DELETE routes
meetings.delete('/:id(\d+)', meetingsController.delete);

module.exports = meetings;
