/**
 * PRESELECTIONS CONTROLLER
 * Answers to API requests from /preselections router
 */

const Preselection = require('../models/Preselection');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    // List all preselections
    list (req, res) {
        return commonsController.list(req, res, Preselection);
    },

    // Insert a new preselection
    insert (req, res) {
        const { fkGodfatherAccountId, fkLaureateAccountId } = req.body;

        if (!fkGodfatherAccountId || !fkLaureateAccountId) {
            return res.status(400).json({
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

    // Update an  existing preselection
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
                },
                returning: true
            })
            .then(([, preselection]) => {
                if (!preselection[0]) {
                    return res.status(404).json({ message: 'Preselection not found' });
                }
                return res.status(200).json(preselection[0])
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    // Delete a preselection
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
                        message: 'Preselection not found',
                    });
                }
                return Preselection
                    .destroy({
                        where: {
                            fkGodfatherAccountId: req.params.godfatherId,
                            fkLaureateAccountId: req.params.laureateId
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
                if (error.name === "SequelizeUniqueConstraintError") {
                    return res.status(400).json(error);
                } else {
                    return res.status(500).json({ message: 'Internal Error' });
                }
            });
    },

    // Get a preselection by fkGodfatherAccountId and fkLaureateAccountId
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
                if (error.name === "SequelizeUniqueConstraintError") {
                    return res.status(400).json(error);
                } else {
                    return res.status(500).json({ message: 'Internal Error' });
                }
            });
    },

    // List all preselections by fkGodfatherAccountId
    listByGodfather (req, res) {
        return Preselection
            .findAll({
                where: {
                    fkGodfatherAccountId: req.params.godfatherId
                },
                include: [{ all: true, nested: true }]
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

    // List all preselections by fkLaureateAccountId
    listByLaureate (req, res) {
        return Preselection
            .findAll({
                where: {
                    fkLaureateAccountId: req.params.laureateId
                },
                include: [{ all: true, nested: true }]
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
