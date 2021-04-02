const routes = require('express').Router();
const accountsRouter = require('../routes/accounts');
const formsRouter = require('../routes/forms');

routes.use('/accounts', accountsRouter);
routes.use('/forms', formsRouter);

// API root
routes.get('/', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.status(200);
    res.send('{"message":"Hello from the custom server! /"}');
});

module.exports = routes
