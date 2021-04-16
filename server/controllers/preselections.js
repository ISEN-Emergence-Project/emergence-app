const { Preselection } = require('../models');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Preselection);
    },

    insert (req, res) {
        const { fkGodfatherAccountId, fkLaureateAccountId } = req.body;

        if (!fkGodfatherAccountId || !fkLaureateAccountId) {
            res.status(400).json({
                message: 'Missing required parameters',
                info: 'Requires: fkGodfatherAccountId, fkLaureateAccountId'
            })
        }

        return Preselection
            .create({
                fkGodfatherAccountId: fkGodfatherAccountId,
                fkLaureateAccountId: fkLaureateAccountId
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
        const { fkGodfatherAccountId, fkLaureateAccountId } = req.body;

        return Preselection
            .update({
                fkGodfatherAccountId: fkGodfatherAccountId,
                fkLaureateAccountId: fkLaureateAccountId
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
            .findOne({
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
