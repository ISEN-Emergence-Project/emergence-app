const { Match } = require('../models');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Match);
    },

    insert (req, res) {
        return Match
            .create({
                fkGodfatherAccountId: req.body.fkGodfatherAccountId,
                fkLaureateAccountId: req.body.fkLaureateAccountId
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
        return Match
            .update({
                fkGodfatherAccountId: req.body.fkGodfatherAccountId,
                fkLaureateAccountId: req.body.fkLaureateAccountId
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
