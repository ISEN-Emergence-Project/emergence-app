/**
 * FORMS CONTROLLER
 * Answers to API requests from /forms router
 */

const Form = require('../models/Form');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    // List all forms
    list (req, res) {
        return commonsController.list(req, res, Form);
    },

    // Insert a new form
    insert (req, res) {
        const { title, description, bannerUrl, fkPhaseId } = req.body;

        if ( !title || !description || !bannerUrl || !fkPhaseId) {
            return res.status(400).json({
                message: 'Missing required parameters',
                info: 'Requires: formId, title, description, bannerUrl, fkPhaseId'
            })
        }
        
        return Form
            .create({
                title: title,
                description: description,
                bannerUrl: bannerUrl,
                fkPhaseId: fkPhaseId
            })
            .then((Form) => {
                res.status(201).json(Form);
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

    // Update an existing form
    update (req, res) {
        const { title, description, bannerUrl, fkPhaseId } = req.body;

        return Form
            .update({
                title: title,
                description: description,
                bannerUrl: bannerUrl,
                fkPhaseId: fkPhaseId
            }, {
                where: {
                    formId: req.params.id
                },
                returning: true
            })
            .then(([, form]) => {
                if (!form[0]) {
                    return res.status(404).json({ message: 'Form not found' });
                }
                return res.status(200).json(form[0])
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

    // Update latest form
    updateLatest (req, res) {
        const { title, description, bannerUrl, fkPhaseId } = req.body;

        return Form
            .findAll({
                limit: 1,
                order: [['createdAt', 'DESC']]
            })
            .then((lastestForm) => {
                return Form
                    .update({
                        title: title,
                        description: description,
                        bannerUrl: bannerUrl,
                        fkPhaseId: fkPhaseId
                    }, {
                        where: {
                            formId: lastestForm[0].formId
                        },
                        returning: true
                    })
                    .then(([, form]) => {
                        if (!form[0]) {
                            return res.status(404).json({ message: 'Form not found' });
                        }
                        return res.status(200).json(form[0])
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.name === "SequelizeUniqueConstraintError") {
                            return res.status(400).json(error);
                        } else {
                            return res.status(500).json({ message: 'Internal Error' });
                        }
                    });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    // Delete a form
    delete (req, res) {
        return Form
            .findOne({
                where: {
                    formId: req.params.id
                }
            })
            .then(entity => {
                if (!entity) {
                    return res.status(400).json({
                        message: 'Form not found',
                    });
                }
                return Form
                    .destroy({
                        where: {
                            formId: req.params.id
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

    // Get a form by formId
    getById (req, res) {
        return Form
            .findOne({
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
                return res.status(200).json(form);
            })
            .catch((error) => {
                console.log(error);
                res.status(404).json({ message: 'Form not found' });
            });
    },

    // Get latest form
    getLatest (req, res) {
        return Form
            .findAll({
                limit: 1,
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

    // Get latest formId
    // Internal function for other controllers
    getLatestFormId () {
        return Form
            .findAll({
                limit: 1,
                order: [['createdAt', 'DESC']]
            })
            .then((form) => {
                return form[0].formId;
            })
            .catch((error) => {
                console.log(error);
                return null;
            });
    }
};
