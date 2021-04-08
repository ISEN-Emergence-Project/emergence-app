const questions = require('express').Router();

const Question = require('../db/models/Question');

questions.get('/', function (req,res) {
    (async () => {
        try {
            const questions = await Question.findAll();

            res.send(JSON.stringify({question: questions}));
        }
        catch (e) {
            res.send(e);
        }
    })();
})

module.exports = questions;
