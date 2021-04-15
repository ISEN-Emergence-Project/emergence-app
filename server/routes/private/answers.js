const answers = require('express').Router();

const answersController = require('../../controllers/answers');

// GET routes
answers.get('/', answersController.list);
answers.get('/:id([0-9]+)', answersController.getById);

// POST routes
answers.post('/', answersController.insert);

// PUT routes
answers.put('/:id([0-9]+)', answersController.update);

// DELETE routes
answers.delete('/:id([0-9]+)', answersController.delete);

module.exports = answers;
