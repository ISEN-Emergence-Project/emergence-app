const meetings = require('express').Router();

const meetingsController = require('../../controllers/meetings');

// GET routes
meetings.get('/', meetingsController.list);
meetings.get('/:id', meetingsController.getById);

// POST routes
meetings.post('/', meetingsController.insert);

// PUT routes
meetings.put('/:id', meetingsController.update);

// DELETE routes
meetings.delete('/:id', meetingsController.delete);

module.exports = meetings;
