const forms = require('express').Router();

const formsController = require('../../controllers/forms');

forms.get('/', formsController.list);
forms.get('/latest', formsController.list);
forms.get('/latest/questions', formsController.getLatestQuestions);
forms.get('/:id', formsController.getById);
forms.post('/', formsController.add);

module.exports = forms;
