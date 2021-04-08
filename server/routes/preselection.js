const preselections = require('express').Router();

const Preselection = require('../db/models/Preselection');

preselections.get('/', function (req,res) {
    (async () => {
        try {
            const preselections = await Preselection.findAll();

            res.send(JSON.stringify({preselection: preselections}));
        }
        catch (e) {
            res.send(e);
        }
    })();
})

module.exports = preselections;
