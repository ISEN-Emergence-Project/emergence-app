const { Answer } = require('../models');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Answer);
    },

    insert (req, res) {
        return Answer
            .create({
                fkAccountId: req.body.fkAccountId,
                fkQuestionId: req.body.fkQuestionId,
                answer: req.body.answer
            })
            .then((Answer) => {
                res.status(201).json(Answer);
            })
            .catch((error) => {
                res.status(400).json(JSON.stringify(error));
            });
    },

    update (req, res) {
        return Answer
            .update({
                fkAccountId: req.body.fkAccountId,
                fkQuestionId: req.body.fkQuestionId,
                answer: req.body.answer
            }, {
                where: {
                    answerId: req.params.id
                }
            })
            .then(([n_lines, answer]) => res.status(200).json(answer[0]))
            .catch((error) => res.status(400).json(JSON.stringify(error)));
    },

    delete (req, res) {
        return commonsController.delete(req, res, Answer);
    },

    getById (req, res) {
        return Answer
            .findAll({
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
                return res.status(200).json(answer[0]);
            })
            .catch((error) => {
                res.status(400).json(JSON.stringify(error));
            });
    }
};
