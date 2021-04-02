const forms = require('express').Router();

const Form = require('../models/Form');

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

forms.post('/', function (req,res) {
    (async () => {
        try{
            const newForm = await Form.create(
                {
                    userName: req.body.userName,
                    password: req.body.password,
                    email: req.body.email,
                    lastName: req.body.lastName,
                    firstName: req.body.firstName,
                    role: req.body.role
                }
            );
            res.send(JSON.stringify({response:"Form created"}))
        }
        catch(e){
            res.send(e);
        }
    })();
});

module.exports = forms;
