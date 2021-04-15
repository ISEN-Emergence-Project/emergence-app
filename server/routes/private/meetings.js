const meetings = require('express').Router();

const meetingsController = require('../../controllers/meetings');

// GET routes
meetings.get('/', meetingsController.list);
meetings.get('/:id([0-9]+)', meetingsController.getById);

// POST routes
meetings.post('/', meetingsController.insert);

// PUT routes
meetings.put('/:id([0-9]+)', meetingsController.update);

// DELETE routes
meetings.delete('/:id([0-9]+)', meetingsController.delete);

module.exports = meetings;
