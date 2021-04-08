const accounts = require('express').Router();

const Account = require('../models/Account');

accounts.get('/', function (req,res) {
    (async () => {
        try {
            const accounts = await Account.findAll();

            res.send(JSON.stringify({account: accounts}));
        }
        catch (e) {
            res.send(e);
        }
    })();
})

accounts.post('/', function (req,res) {
    (async () => {
        try{
            const newAccount = await Account.create(
                {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    email: req.body.email,
                    passwordHash: req.body.passwordHash,
                    role: req.body.role,
                    isArchived: req.body.isArchived,
                    resetKey: req.body.resetKey
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
