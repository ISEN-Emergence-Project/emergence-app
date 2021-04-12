const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const cookieParser = require('cookie-parser');

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


// Parse cookies
router.use(cookieParser());

// Parse application/json
router.use(bodyParser.json());

// Parse application/xwww-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));

// Parse multipart/form-data
router.use(upload.array());
router.use(express.static('public'));


/* ----------------------- */
/* ----- API ROUTING ----- */
/* ----------------------- */


/* ----- Public API Routes ----- */

// Handle root
router.get('/', function (req, res) {
    res.status(200).json({
        "message": "OK"
    });
});

// Handle login
router.use('/login', loginRouter);


/* ----- Private API Routes ----- */

// Handle main API routes
router.use('/accounts', authJwt, accountsRouter);
router.use('/answers', authJwt, answersRouter);
router.use('/forms', authJwt, formsRouter);
router.use('/matches', authJwt, matchesRouter);
router.use('/meetings', authJwt, meetingsRouter);
router.use('/preselections', authJwt, preselectionsRouter);
router.use('/questions', authJwt, questionsRouter);


// Handle other API routes, send Not found
router.use('*', function (req, res) {
    res.status(404).json({
        "message": "Not found",
        "originalUrl": req.originalUrl,
        "url": req.url,
        "path": req.path,
    });
});


module.exports = router
