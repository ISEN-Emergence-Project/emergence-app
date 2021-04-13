const answers = require('express').Router();

const answersController = require('../../controllers/answers');

// GET routes
answers.get('/', answersController.list);
answers.get('/:id', answersController.getById);

// POST routes
answers.post('/', answersController.insert);

// PUT routes
answers.put('/:id', answersController.update);

// DELETE routes
answers.delete('/:id', answersController.delete);

module.exports = answers;
