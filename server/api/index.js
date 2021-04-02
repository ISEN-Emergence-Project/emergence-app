const api = require('express').Router();

// Include API routes
const accountsRouter = require('./accounts');
const answersRouter = require('./answers');
const formsRouter = require('./forms');
const matchesRouter = require('./match');
const meetingsRouter = require('./meeting');
const preselectionsRouter = require('./preselection');
const questionsRouter = require('./question');

// Handle API routes
api.use('/accounts', accountsRouter);
api.use('/answers', answersRouter);
api.use('/matches', matchesRouter);
api.use('/meetings', meetingsRouter);
api.use('/preselections', preselectionsRouter);
api.use('/questions', questionsRouter);

// Handle other API routes
api.get('*', function (req, res) {
    res.status(200).json({
        "message": "Hello from the custom server!",
        "originalUrl": req.originalUrl,
        "url": req.url,
        "path": req.path,
    });
});

module.exports = api
