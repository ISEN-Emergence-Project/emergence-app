const { Preselection } = require('../models');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Preselection);
    },

    insert (req, res) {
        return Preselection
            .create({
                fkGodfatherAccountId: req.body.fkGodfatherAccountId,
                fkLaureateAccountId: req.body.fkLaureateAccountId
            })
            .then((Preselection) => {
                res.status(201).json(Preselection);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    update (req, res) {
        return Preselection
            .update({
                fkGodfatherAccountId: req.body.fkGodfatherAccountId,
                fkLaureateAccountId: req.body.fkLaureateAccountId
            }, {
                where: {
                    preselectionId: req.params.id
                }
            })
            .then(([, preselection]) => res.status(200).json(preselection[0]))
            .catch((error) => console.log(error));
    },

    delete (req, res) {
        return commonsController.delete(req, res, Preselection);
    },

    getById (req, res) {
        return Preselection
            .findAll({
                where: {
                    preselectionId: req.params.id
                }
            })
            .then((preselection) => {
                if (!preselection) {
                    return res.status(404).json({
                        message: 'Preselection Not Found',
                    });
                }
                return res.status(200).json(preselection[0]);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    }
};
