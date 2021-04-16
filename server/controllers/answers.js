const { Answer } = require('../models');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Answer);
    },

    insert (req, res) {
        const { fkAccountId, fkQuestionId, answer } = req.body;

        if (!fkAccountId || !fkQuestionId || !answer) {
            res.status(400).json({
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
                res.status(500).json({ message: 'Internal error' });
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
                    answerId: req.params.id
                }
            })
            .then(([, answer]) => res.status(200).json(answer[0]))
            .catch((error) => console.log(error));
    },

    delete (req, res) {
        Answer
            .findOne({
                where: {
                    answerId: req.params.id
                }
            })
            .then(entity => {
                if (!entity) {
                    return res.status(400).json({
                        message: 'Model Not Found',
                    });
                }
                return Answer
                    .destroy()
                    .then(() => res.status(204).json())
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    },

    getById (req, res) {
        return Answer
            .findOne({
                where: {
                    answerId: req.params.id
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
    }
};
