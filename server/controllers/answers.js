const Answer = require('../models/Answer');
const Question = require('../models/Question');

const { getLatestFormId } = require('../controllers/forms');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Answer);
    },

    insert (req, res) {
        const { fkAccountId, fkQuestionId, answer } = req.body;

        if (!fkAccountId || !fkQuestionId || !answer) {
            return res.status(400).json({
                message: 'Missing required parameters',
                info: 'Requires: fkAccountId, fkQuestionId, answer'
            })
        }

        return Answer
            .create({
                fkAccountId: fkAccountId,
                fkQuestionId: fkQuestionId,
                answer: answer
            })
            .then((Answer) => {
                res.status(201).json(Answer);
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
        const { fkAccountId, fkQuestionId, answer } = req.body;

        return Answer
            .update({
                fkAccountId: fkAccountId,
                fkQuestionId: fkQuestionId,
                answer: answer
            }, {
                where: {
                    fkAccountId: req.params.accountId,
                    fkQuestionId: req.params.questionId
                    },
                returning: true
            })
            .then(([, answer]) => {
                if (!answer[0]) {
                    return res.status(404).json({ message: 'Answer not found' });
                }
                return res.status(200).json(answer[0])
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

    delete (req, res) {
        return Answer
            .findOne({
                where: {
                    fkAccountId: req.params.accountId,
                    fkQuestionId: req.params.questionId
                }
            })
            .then(entity => {
                if (!entity) {
                    return res.status(400).json({
                        message: 'Answer not found',
                    });
                }
                return Answer
                    .destroy({
                        where: {
                            fkAccountId: req.params.accountId,
                            fkQuestionId: req.params.questionId
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

    getByAccountQuestion (req, res) {
        return Answer
            .findOne({
                where: {
                    fkAccountId: req.params.accountId,
                    fkQuestionId: req.params.questionId
                }
            })
            .then((answer) => {
                if (!answer) {
                    return res.status(404).json({
                        message: 'Answer Not Found',
                    });
                }
                return res.status(200).json(answer);
            })
            .catch((error) => {
                console.log(error);
                res.status(404).json({ message: 'Answer not found' });
            });
    },

    listByAccountForm (req, res) {
        return Answer
            .findAll({
                where: {
                    fkAccountId: req.params.accountId
                },
                include: {
                    model: Question,
                    where: {
                        fkFormId: req.params.formId
                    }
                }
            })
            .then((answers) => {
                if (!answers) {
                    return res.status(404).json({
                        message: 'Answer Not Found',
                    });
                }
                return res.status(200).json(answers);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    listByAccountLatestForm (req, res) {
        return getLatestFormId()
            .then((latestFormId) => {
                Answer
                    .findAll({
                        where: {
                            fkAccountId: req.params.accountId
                        },
                        include: {
                            model: Question,
                            where: {
                                fkFormId: latestFormId
                            }
                        }
                    })
                    .then((answer) => {
                        if (!answer) {
                            return res.status(404).json({
                                message: 'Answer Not Found',
                            });
                        }
                        return res.status(200).json(answer);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({ message: 'Internal error' });
                    });
            });
    }
};
