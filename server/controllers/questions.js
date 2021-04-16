const { Question } = require('../models');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Question);
    },

    insert (req, res) {
        const { question, description, fkFormId } = req.body;

        if (!question || !description || !fkFormId) {
            res.status(400).json({
                message: 'Missing required parameters',
                info: 'Requires: question, description, fkFormId'
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
                res.status(500).json({ message: 'Internal error' });
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
            .catch((error) => console.log(error));
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
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    }
};
