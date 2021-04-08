const matches = require('express').Router();

const Match = require('../db/models/Match');

matches.get('/', function (req,res) {
    (async () => {
        try {
            const matches = await Match.findAll();

            res.send(JSON.stringify({match: matches}));
        }
        catch (e) {
            res.send(e);
        }
    })();
})

module.exports = matches;
