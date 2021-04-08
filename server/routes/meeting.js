const meetings = require('express').Router();

const Meeting = require('../db/models/Meeting');

meetings.get('/', function (req,res) {
    (async () => {
        try {
            const meetings = await Meeting.findAll();

            res.send(JSON.stringify({meeting: meetings}));
        }
        catch (e) {
            res.send(e);
        }
    })();
})

module.exports = meetings;
