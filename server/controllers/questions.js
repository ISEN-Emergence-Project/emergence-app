const { Question } = require('../models');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Question);
    },

    insert (req, res) {
        return Question
            .create({
                question: req.body.question,
                description: req.body.description,
                fkFormId: req.body.fkFormId
            })
            .then((Question) => {
                res.status(201).json(Question);
            })
            .catch((error) => {
                res.status(400).json(JSON.stringify(error));
            });
    },

    update (req, res) {
        return Question
            .update({
                question: req.body.question,
                description: req.body.description,
                fkFormId: req.body.fkFormId
            }, {
                where: {
                    questionId: req.params.id
                }
            })
            .then(([n_lines, question]) => res.status(200).json(question[0]))
            .catch((error) => res.status(400).json(JSON.stringify(error)));
    },

    delete (req, res) {
        return commonsController.delete(req, res, Question);
    },

    getById (req, res) {
        return Question
            .findAll({
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
                return res.status(200).json(question[0]);
            })
            .catch((error) => {
                res.status(400).json(JSON.stringify(error));
            });
    }
};
