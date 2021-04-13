const answers = require('express').Router();

const commonsController = require('../../controllers/commons');
const answerController = require('../../controllers/answer');

const Answer = require('../../models/Answer');

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
