/**
 * MATCHES CONTROLLER
 * Answers to API requests from /matches router
 */

const Match = require('../models/Match');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    // List all matches
    list (req, res) {
        return commonsController.list(req, res, Match);
    },

    // Insert a new match
    insert (req, res) {
        const { fkGodfatherAccountId, fkLaureateAccountId } = req.body;

        if (!fkGodfatherAccountId || !fkLaureateAccountId) {
            return res.status(400).json({
                message: 'Missing required parameters',
                info: 'Requires: fkGodfatherAccountId, fkLaureateAccountId'
            })
        }

        return Match
            .create({
                fkGodfatherAccountId: fkGodfatherAccountId,
                fkLaureateAccountId: fkLaureateAccountId
            })
            .then((Match) => {
                res.status(201).json(Match);
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

    // Update an existing match
    update (req, res) {
        const { fkGodfatherAccountId, fkLaureateAccountId } = req.body;

        return Match
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
            .then(([, match]) => {
                if (!match[0]) {
                    return res.status(404).json({ message: 'Match not found' });
                }
                return res.status(200).json(match[0])
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

    // Delete a match
    delete (req, res) {
        return Match
            .findOne({
                where: {
                    fkGodfatherAccountId: req.params.godfatherId,
                    fkLaureateAccountId: req.params.laureateId
                }
            })
            .then(entity => {
                if (!entity) {
                    return res.status(400).json({
                        message: 'Match not found',
                    });
                }
                return Match
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
                return res.status(500).json({ message: 'Internal error' });
            });
    },

    // Get a match by fkGodfatherAccountId and fkLaureateAccountId
    getByGodfatherLaureate (req, res) {
        return Match
            .findOne({
                where: {
                    fkGodfatherAccountId: req.params.godfatherId,
                    fkLaureateAccountId: req.params.laureateId
                }
            })
            .then((match) => {
                if (!match) {
                    return res.status(404).json({
                        message: 'Match Not Found',
                    });
                }
                return res.status(200).json(match);
            })
            .catch((error) => {
                console.log(error);
                res.status(404).json({ message: 'Match not found' });
            });
    },

    // List matches by fkGodfatherAccountId
    listByGodfather (req, res) {
        return Match
            .findAll({
                where: {
                    fkGodfatherAccountId: req.params.godfatherId
                }
            })
            .then((matches) => {
                if (!matches) {
                    return res.status(404).json({
                        message: 'Match Not Found',
                    });
                }
                return res.status(200).json(matches);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    // List matches by fkLaureateAccountId
    listByLaureate (req, res) {
        return Match
            .findAll({
                where: {
                    fkLaureateAccountId: req.params.laureateId
                }
            })
            .then((matches) => {
                if (!matches) {
                    return res.status(404).json({
                        message: 'Match Not Found',
                    });
                }
                return res.status(200).json(matches);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    }
};
