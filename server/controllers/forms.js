import Form from '../models/Form';
import Question from '../models/Question';

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Form);
    },

    insert (req, res) {
        const { formId, title, description, bannerUrl } = req.body;

        if (!formId || !title || !description || !bannerUrl) {
            res.status(400).json({
                message: 'Missing required parameters',
                info: 'Requires: formId, title, description, bannerUrl'
            })
        }
        
        return Form
            .create({
                formId: formId,
                title: title,
                description: description,
                bannerUrl: bannerUrl
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
        const { formId, title, description, bannerUrl } = req.body;

        return Form
            .update({
                formId: formId,
                title: title,
                description: description,
                bannerUrl: bannerUrl
            }, {
                where: {
                    formId: req.params.id
                }
            })
            .then(([, form]) => res.status(200).json(form[0]))
            .catch((error) => console.log(error));
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
                        message: 'Model Not Found',
                    });
                }
                return Question
                    .destroy()
                    .then(() => res.status(204).json())
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
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
    },

    // TO DELETE, obsolete
    getLatestQuestions (req, res) {
        return Question
            .findAll({
                where: {
                    fkFormId: this.getLatestFormId()
                }
            })
            .then((questions) => {
                return res.status(200).json(questions);
            });
    }
};
