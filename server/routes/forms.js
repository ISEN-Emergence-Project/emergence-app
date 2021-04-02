const forms = require('express').Router();
const sequelize = require('../utils/database');

const Form = require('../models/Form');

forms.get('/', function (req,res) {
    (async () => {
        const forms = await Form.findAll();

        res.send(JSON.stringify({form: forms}));
    })();
})

forms.post('/', function (req,res) {
    (async () => {
        // await sequelize.sync({ force: true });
        // Code here
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
