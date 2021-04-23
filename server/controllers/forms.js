const Form = require('../models/Form');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Form);
    },

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
