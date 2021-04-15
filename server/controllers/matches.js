const { Match } = require('../models');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Match);
    },

    insert (req, res) {
        const { fkGodfatherAccountId, fkLaureateAccountId } = req.body;

        if (!fkGodfatherAccountId || !fkLaureateAccountId) {
            res.status(400).json({
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
                res.status(500).json({ message: 'Internal error' });
            });
    },

    update (req, res) {
        const { fkGodfatherAccountId, fkLaureateAccountId } = req.body;

        return Match
            .update({
                fkGodfatherAccountId: fkGodfatherAccountId,
                fkLaureateAccountId: fkLaureateAccountId
            }, {
                where: {
                    matchId: req.params.id
                }
            })
            .then(([, match]) => res.status(200).json(match[0]))
            .catch((error) => console.log(error));
    },

    delete (req, res) {
        return commonsController.delete(req, res, Match);
    },

    getById (req, res) {
        return Match
            .findAll({
                where: {
                    matchId: req.params.id
                }
            })
            .then((match) => {
                if (!match) {
                    return res.status(404).json({
                        message: 'Match Not Found',
                    });
                }
                return res.status(200).json(match[0]);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    }
};
