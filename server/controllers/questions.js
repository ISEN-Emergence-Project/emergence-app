const Question = require('../models/Question');

const { getLatestFormId } = require('../controllers/forms')

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Question);
    },

    insert (req, res) {
        const { question, description, fkFormId } = req.body;

        if (!question || !fkFormId) {
            res.status(400).json({
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
            .then(([, question]) => res.status(200).json(question[0]))
            .catch((error) => {
                console.log(error);
                if (error.name === "SequelizeUniqueConstraintError") {
                    return res.status(400).json(error);
                } else {
                    return res.status(500).json({ message: 'Internal Error' });
                }
            });
    },

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

    listByForm (req, res) {
        return Question
            .findAll({
                where: {
                    fkFormId: req.params.id
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
                res.status(500).json({ message: 'Internal error' });
            });
    },

    listByLatestForm (req, res) {
        return getLatestFormId()
            .then((latestFormId) => {
                Question
                    .findAll({
                        where: {
                            fkFormId: latestFormId
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
                        res.status(500).json({ message: 'Internal error' });
                    });
            });
    }
};
