/**
 * API ANSWERS ROUTER
 * Handle all /api/answers requests
 */

const answers = require('express').Router();

const answersController = require('../../controllers/answers');

// GET routes
answers.get('/', answersController.list);
answers.get('/account/:accountId([0-9]+)/question/:questionId([0-9]+)', answersController.getByAccountQuestion);
answers.get('/account/:accountId([0-9]+)/form/:formId([0-9]+)', answersController.listByAccountForm);
answers.get('/account/:accountId([0-9]+)/form/latest', answersController.listByAccountLatestForm);

// POST routes
answers.post('/', answersController.insert);

// PUT routes
answers.put('/account/:accountId([0-9]+)/question/:questionId([0-9]+)', answersController.update);

// DELETE routes
answers.delete('/account/:accountId([0-9]+)/question/:questionId([0-9]+)', answersController.delete);

module.exports = answers;
