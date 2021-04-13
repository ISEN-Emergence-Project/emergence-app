const answers = require('express').Router();

const answersController = require('../../controllers/answers');

// GET routes
answers.get('/', answersController.list);
answers.get('/:id(\d+)', answersController.getById);

// POST routes
answers.post('/', answersController.insert);

// PUT routes
answers.put('/:id(\d+)', answersController.update);

// DELETE routes
answers.delete('/:id(\d+)', answersController.delete);

module.exports = answers;
