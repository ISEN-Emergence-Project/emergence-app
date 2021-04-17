const answers = require('express').Router();

const answersController = require('../../controllers/answers');

// GET routes
answers.get('/', answersController.list);
answers.get('/account/:accountId([0-9]+)/question/:questionId([0-9]+)', answersController.getByAccountQuestion);

// POST routes
answers.post('/', answersController.insert);

// PUT routes
answers.put('/account/:accountId([0-9]+)/question/:questionId([0-9]+)', answersController.update);

// DELETE routes
answers.delete('/account/:accountId([0-9]+)/question/:questionId([0-9]+)', answersController.delete);

module.exports = answers;
