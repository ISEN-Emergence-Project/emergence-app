const forms = require('express').Router();

const formsController = require("../../controllers/forms");

// GET routes
forms.get('/', formsController.list);
forms.get('/:id', formsController.getById);
forms.get('/latest', formsController.getLatest);
forms.get('/latest/questions', formsController.getLatestQuestions);

// POST routes
forms.post('/', formsController.insert);

// PUT routes
forms.put('/:id', formsController.update);

// DELETE routes
forms.delete('/:id', formsController.delete);

module.exports = forms;
