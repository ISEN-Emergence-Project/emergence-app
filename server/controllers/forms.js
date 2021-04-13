const { Form, Question } = require('../models');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Form);
    },

    insert (req, res) {
        return Form
            .create({
                formId: req.body.formId,
                title: req.body.title,
                description: req.body.description,
                bannerUrl: req.body.bannerUrl
            })
            .then((Form) => {
                res.status(201).json(Form);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    update (req, res) {
        return Form
            .update({
                formId: req.body.formId,
                title: req.body.title,
                description: req.body.description,
                bannerUrl: req.body.bannerUrl
            }, {
                where: {
                    formId: req.params.id
                }
            })
            .then(([, form]) => res.status(200).json(form[0]))
            .catch((error) => console.log(error));
    },

    delete (req, res) {
        return commonsController.delete(req, res, Form);
    },

    getById (req, res) {
        return Form
            .findAll({
                where: {
                    formId: req.params.id
                }
            })
            .then((form) => {
                if (!form) {
                    return res.status(404).json({
                        message: 'Form Not Found',
                    });
                }
                return res.status(200).json(form[0]);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    getLatest(req, res) {
        console.log('> Get latest form');
        return Form
            .findAll({
                limit: 1,
                where: {},
                order: [['createdAt', 'DESC']]
            })
            .then((form) => {
                return res.status(200).json(form[0]);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    getLatestQuestions(req, res) {
        return Form
            .findAll({
                limit: 1,
                order: [['createdAt', 'DESC']]
            })
            .then((latestForm) => {
                Question
                    .findAll({
                        where: {
                            fkFormId: latestForm[0].formId
                        }
                    })
                    .then((questions) => {
                        return res.status(200).json(questions);
                    });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    }
};
