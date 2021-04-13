const questions = require('express').Router();

const questionsController = require('../../controllers/questions');

// GET routes
questions.get('/', questionsController.list);
questions.get('/:id', questionsController.getById);

// POST routes
questions.post('/', questionsController.insert);

// PUT routes
questions.put('/:id', questionsController.update);

// DELETE routes
questions.delete('/:id', questionsController.delete);

module.exports = questions;
