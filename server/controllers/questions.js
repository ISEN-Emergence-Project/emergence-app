/**
 * QUESTIONS CONTROLLER
 * Answers to API requests from /questions router
 */

const Question = require('../models/Question');

const { getLatestFormId } = require('../controllers/forms')

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    // List all questions
    list (req, res) {
        return commonsController.list(req, res, Question);
    },

    // Insert a new question
    insert (req, res) {
        const { question, description, fkFormId } = req.body;

        // Check required fields
        if (!question || !fkFormId) {
            return res.status(400).json({
                message: 'Missing required parameters',
                info: 'Requires: question, fkFormId'
            })
        }
        
        return Question
            .create({
                question: question,
                description: description,
                fkFormId: fkFormId
            })
            .then((Question) => {
                res.status(201).json(Question);
            })
            .catch((error) => {
                console.log(error);
                if (error.name === "SequelizeUniqueConstraintError") {
                    return res.status(400).json(error);
                } else {
                    return res.status(500).json({ message: 'Internal Error' });
                }
            });
    },

    // Update an existing question
    update (req, res) {
        const { question, description, fkFormId } = req.body;

        return Question
            .update({
                question: question,
                description: description,
                fkFormId: fkFormId
            }, {
                where: {
                    questionId: req.params.id
                },
                returning: true
            })
            .then(([, question]) => {
                if (!question[0]) {
                    return res.status(404).json({ message: 'Question not found' });
                }
                return res.status(200).json(question[0])
            })
            .catch((error) => {
                console.log(error);
                if (error.name === "SequelizeUniqueConstraintError") {
                    return res.status(400).json(error);
                } else {
                    return res.status(500).json({ message: 'Internal Error' });
                }
            });
    },

    // Delete a question
    delete (req, res) {
        return Question
            .findOne({
                where: {
                    questionId: req.params.id
                }
            })
            .then(entity => {
                if (!entity) {
                    return res.status(400).json({
                        message: 'Question not found',
                    });
                }
                return Question
                    .destroy({
                        where: {
                            questionId: req.params.id
                        }
                    })
                    .then(() => res.status(204).json())
                    .catch((error) => {
                        console.log(error);
                        return res.status(500).json({ message: 'Internal error' });
                    });
            })
            .catch((error) => {
                console.log(error);
                return res.status(500).json({ message: 'Internal error' });
            });
    },

    // Get a question by questionId
    getById (req, res) {
        return Question
            .findOne({
                where: {
                    questionId: req.params.id
                }
            })
            .then((question) => {
                if (!question) {
                    return res.status(404).json({
                        message: 'Question Not Found',
                    });
                }
                return res.status(200).json(question);
            })
            .catch((error) => {
                console.log(error);
                res.status(404).json({ message: 'Question not found' });
            });
    },

    // List all questions by fkFormId
    listByForm (req, res) {
        return Question
            .findAll({
                where: {
                    fkFormId: req.params.id
                },
                order: [['questionId', 'ASC']]
            })
            .then((question) => {
                if (!question) {
                    return res.status(404).json({
                        message: 'Question Not Found',
                    });
                }
                return res.status(200).json(question);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    // List all questions for the latest form
    listByLatestForm (req, res) {
        return getLatestFormId()
            .then((latestFormId) => {
                Question
                    .findAll({
                        where: {
                            fkFormId: latestFormId
                        },
                        order: [['questionId', 'ASC']]
                    })
                    .then((question) => {
                        if (!question) {
                            return res.status(404).json({
                                message: 'Question Not Found',
                            });
                        }
                        return res.status(200).json(question);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({ message: 'Internal error' });
                    });
            });
    }
};
