const api = require('express').Router();

// Include API routes
const accountsRouter = require('./accounts');
const formsRouter = require('./forms');

// Handle API routes
api.use('/accounts', accountsRouter);
api.use('/forms', formsRouter);

// Handle other API routes
api.get('*', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.satus(200).json({
        "message": "Hello from the custom server!",
        "route": req.path
    });
});

module.exports = api
