const preselections = require('express').Router();

const preselectionsController = require('../../controllers/preselections');

// GET routes
preselections.get('/', preselectionsController.list);
preselections.get('/godfather/:godfatherId([0-9]+)/laureate/:laureateId([0-9]+)', preselectionsController.getByGodfatherLaureate);
preselections.get('/godfather/:godfatherId([0-9]+)', preselectionsController.listByGodfather);
preselections.get('/laureate/:laureateId([0-9]+)', preselectionsController.listByLaureate);

// POST routes
preselections.post('/', preselectionsController.insert);

// PUT routes
preselections.put('/godfather/:godfatherId([0-9]+)/laureate/:laureateId([0-9]+)', preselectionsController.update);

// DELETE routes
preselections.delete('/godfather/:godfatherId([0-9]+)/laureate/:laureateId([0-9]+)', preselectionsController.delete);

module.exports = preselections;
