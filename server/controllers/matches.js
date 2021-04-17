const Match = require('../models/Match');

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
                    fkGodfatherAccountId: req.params.godfatherId,
                    fkLaureateAccountId: req.params.laureateId
                },
                returning: true
            })
            .then(([, match]) => res.status(200).json(match[0]))
            .catch((error) => console.log(error));
    },

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
                        message: 'Model Not Found',
                    });
                }
                return Match
                    .destroy()
                    .then(() => res.status(204).json())
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    },

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
