const accounts = require('express').Router();

const Account = require('../models/Account');

accounts.get('/', function (req,res) {
    (async () => {
        const accounts = await Account.findAll();

        res.send(JSON.stringify({account: accounts}));
    })();
})

accounts.post('/', function (req,res) {
    (async () => {
        try{
            const newAccount = await Account.create(
                {
                    userName: req.body.userName,
                    password: req.body.password,
                    email: req.body.email,
                    lastName: req.body.lastName,
                    firstName: req.body.firstName,
                    role: req.body.role
                }
            );
            res.send(JSON.stringify({response:"Account created"}))
        }
        catch(e){
            res.send(e);
        }
    })();
});

module.exports = accounts;
