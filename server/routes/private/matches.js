const matches = require('express').Router();

const matchesController = require('../../controllers/matches');

// GET routes
matches.get('/', matchesController.list);
matches.get('/godfather/:godfatherId([0-9]+)/laureate/:laureateId([0-9]+)', matchesController.getByGodfatherLaureate);
matches.get('/godfather/:godfatherId([0-9]+)', matchesController.listByGodfather);
matches.get('/laureate/:laureateId([0-9]+)', matchesController.listByLaureate);

// POST routes
matches.post('/', matchesController.insert);

// PUT routes
matches.put('/godfather/:godfatherId([0-9]+)/laureate/:laureateId([0-9]+)', matchesController.update);

// DELETE routes
matches.delete('/godfather/:godfatherId([0-9]+)/laureate/:laureateId([0-9]+)', matchesController.delete);

module.exports = matches;
