const meetings = require('express').Router();

const meetingsController = require('../../controllers/meetings');

// GET routes
meetings.get('/', meetingsController.list);
meetings.get('/godfather/:godfatherId([0-9]+)/laureate/:laureateId([0-9]+)', meetingsController.getByGodfatherLaureate);
meetings.get('/godfather/:godfatherId([0-9]+)', meetingsController.listByGodfather);
meetings.get('/laureate/:laureateId([0-9]+)', meetingsController.listByLaureate);

// POST routes
meetings.post('/', meetingsController.insert);

// PUT routes
meetings.put('/godfather/:godfatherId([0-9]+)/laureate/:laureateId([0-9]+)', meetingsController.update);

// DELETE routes
meetings.delete('/godfather/:godfatherId([0-9]+)/laureate/:laureateId([0-9]+)', meetingsController.delete);

module.exports = meetings;
