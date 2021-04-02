const api = require('express').Router();

// Include API routes
const accountsRouter = require('./accounts');
const formsRouter = require('./forms');

// Handle API routes
api.use('/accounts', accountsRouter);
api.use('/forms', formsRouter);

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
