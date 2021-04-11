const forms = require('express').Router();

const Form = require('../../models/Form');

forms.get('/', function (req,res) {
    (async () => {
        try {
            const forms = await Form.findAll();

            res.send(JSON.stringify({form: forms}));
        }
        catch (e) {
            res.send(e);
        }
    })();
})

module.exports = forms;
