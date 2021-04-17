const forms = require('express').Router();

const formsController = require("../../controllers/forms");

// GET routes
forms.get('/', formsController.list);
forms.get('/:id([0-9]+)', formsController.getById);
forms.get('/:id([0-9]+)/answers/:id([0-9]+)', formsController.getById);
forms.get('/latest', formsController.getLatest);
forms.get('/latest/questions', formsController.getLatestQuestions);
forms.get('/latest/answers/:id([0-9]+)', formsController.getLatestQuestions);

// POST routes
forms.post('/', formsController.insert);

// PUT routes
forms.put('/:id([0-9]+)', formsController.update);

// DELETE routes
forms.delete('/:id([0-9]+)', formsController.delete);

module.exports = forms;
