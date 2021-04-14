const questions = require('express').Router();

const questionsController = require('../../controllers/questions');

// GET routes
questions.get('/', questionsController.list);
questions.get('/:id(\d+)', questionsController.getById);

// POST routes
questions.post('/', questionsController.insert);

// PUT routes
questions.put('/:id(\d+)', questionsController.update);

// DELETE routes
questions.delete('/:id(\d+)', questionsController.delete);

module.exports = questions;
