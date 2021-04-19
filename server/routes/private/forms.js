const forms = require('express').Router();

const formsController = require("../../controllers/forms");

// GET routes
forms.get('/', formsController.list);
forms.get('/:id([0-9]+)', formsController.getById);
forms.get('/latest', formsController.getLatest);

// POST routes
forms.post('/', formsController.insert);

// PUT routes
forms.put('/:id([0-9]+)', formsController.update);

// DELETE routes
forms.delete('/:id([0-9]+)', formsController.delete);

module.exports = forms;
