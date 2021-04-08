const router = require('express').Router();

// Include API routes
const accountsController = require('./accounts');
const answersController = require('./answers');
const formsController = require('./forms');
const matchesController = require('./match');
const meetingsController = require('./meeting');
const preselectionsController = require('./preselection');
const questionsController = require('./question');

// Include middlewares
const authJwt = require('./middlewares/authJwt');

// Handle API routes

// Public routes
router.post('/login', accountsController.login);

// API Authentication
router.use('/', authJwt);

// Private routes
router.use('/accounts', accountsController);
router.use('/answers', answersController);
router.use('/forms', formsController);
router.use('/matches', matchesController);
router.use('/meetings', meetingsController);
router.use('/preselections', preselectionsController);
router.use('/questions', questionsController);

// Handle other API routes
router.get('*', function (req, res) {
    res.status(200).json({
        "message": "Hello from the custom server!",
        "originalUrl": req.originalUrl,
        "url": req.url,
        "path": req.path,
    });
});

module.exports = router
