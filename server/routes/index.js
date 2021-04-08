const router = require('express').Router();

// Include API routes
const accountsController = require('../controllers/accounts');
const answersController = require('../controllers/answers');
const formsController = require('../controllers/forms');
const matchesController = require('../controllers/match');
const meetingsController = require('../controllers/meeting');
const preselectionsController = require('../controllers/preselection');
const questionsController = require('../controllers/question');

// Include middlewares
const authJwt = require('../middlewares/authJwt');

// Handle API routes

// Public routes
router.post('/login', );

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
