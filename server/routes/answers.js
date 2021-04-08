const answers = require('express').Router();

const Answer = require('../db/models/Answer');

answers.get('/', function (req,res) {
    (async () => {
        try {
            const answers = await Answer.findAll();

            res.send(JSON.stringify({answer: answers}));
        }
        catch (e) {
            res.send(e);
        }
    })();
})

module.exports = answers;
