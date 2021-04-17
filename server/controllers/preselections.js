import Preselection from '../models/Preselection';

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
                    fkGodfatherAccountId: req.params.godfatherId,
                    fkLaureateAccountId: req.params.laureateId
                }
            })
            .then(([, preselection]) => res.status(200).json(preselection[0]))
            .catch((error) => console.log(error));
    },

    delete (req, res) {
        return Preselection
            .findOne({
                where: {
                    fkGodfatherAccountId: req.params.godfatherId,
                    fkLaureateAccountId: req.params.laureateId
                }
            })
            .then(entity => {
                if (!entity) {
                    return res.status(400).json({
                        message: 'Model Not Found',
                    });
                }
                return Preselection
                    .destroy()
                    .then(() => res.status(204).json())
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    },

    getByGodfatherLaureate (req, res) {
        return Preselection
            .findOne({
                where: {
                    fkGodfatherAccountId: req.params.godfatherId,
                    fkLaureateAccountId: req.params.laureateId
                }
            })
            .then((preselections) => {
                if (!preselections) {
                    return res.status(404).json({
                        message: 'Preselection Not Found',
                    });
                }
                return res.status(200).json(preselections);
            })
            .catch((error) => {
                console.log(error);
                res.status(404).json({ message: 'Preselection not found' });
            });
    },

    listByGodfather (req, res) {
        return Preselection
            .findAll({
                where: {
                    fkGodfatherAccountId: req.params.godfatherId
                }
            })
            .then((preselection) => {
                if (!preselection) {
                    return res.status(404).json({
                        message: 'Preselection Not Found',
                    });
                }
                return res.status(200).json(preselection);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    listByLaureate (req, res) {
        return Preselection
            .findAll({
                where: {
                    fkLaureateAccountId: req.params.laureateId
                }
            })
            .then((preselection) => {
                if (!preselection) {
                    return res.status(404).json({
                        message: 'Preselection Not Found',
                    });
                }
                return res.status(200).json(preselection);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    }
};
