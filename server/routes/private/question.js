const questions = require('express').Router();

const questionsController = require('../../controllers/questions');

// GET routes
questions.get('/', questionsController.list);
questions.get('/:id([0-9]+)', questionsController.getById);

// POST routes
questions.post('/', questionsController.insert);

// PUT routes
questions.put('/:id([0-9]+)', questionsController.update);

// DELETE routes
questions.delete('/:id([0-9]+)', questionsController.delete);

module.exports = questions;
