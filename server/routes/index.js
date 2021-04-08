const router = require('express').Router();

// Include API routes
const accountsRouter = require('./private/accounts');
const answersRouter = require('./private/answers');
const formsRouter = require('./private/forms');
const matchesRouter = require('./private/match');
const meetingsRouter = require('./private/meeting');
const preselectionsRouter = require('./private/preselection');
const questionsRouter = require('./private/question');

const loginRouter = require('./public/login');

// Include middlewares
const authJwt = require('../middlewares/authJwt');


/* ----------------------- */
/* ----- API ROUTING ----- */
/* ----------------------- */


/* ----- Public API Routes ----- */

router.post('/login', loginRouter);


/* ----- Private API Routes ----- */

// API Authentication before accessing private routes
router.use('/', authJwt);


// Handle main API routes
router.use('/accounts', accountsRouter);
router.use('/answers', answersRouter);
router.use('/forms', formsRouter);
router.use('/matches', matchesRouter);
router.use('/meetings', meetingsRouter);
router.use('/preselections', preselectionsRouter);
router.use('/questions', questionsRouter);


// Handle root
router.get('/', function (req, res) {
    res.status(200).json({
        "message": "OK"
    });
});

// Handle other API routes
router.get('*', function (req, res) {
    res.status(404).json({
        "message": "Not found",
        "originalUrl": req.originalUrl,
        "url": req.url,
        "path": req.path,
    });
});

module.exports = router
