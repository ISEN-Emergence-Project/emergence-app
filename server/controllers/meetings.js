const { Meeting } = require('../models');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Meeting);
    },

    insert (req, res) {
        const { fkGodfatherAccountId, fkLaureateAccountId, beginning, ending, godfatherRating, laureateRating } = req.body;

        if (!fkGodfatherAccountId || !fkLaureateAccountId || !beginning || !ending || !godfatherRating || !laureateRating) {
            res.status(400).json({
                message: 'Missing required parameters',
                info: 'Requires: fkGodfatherAccountId, fkLaureateAccountId, beginning, ending, godfatherRating, laureateRating'
            })
        }
        
        return Meeting
            .create({
                fkGodfatherAccountId: fkGodfatherAccountId,
                fkLaureateAccountId: fkLaureateAccountId,
                beginning: beginning,
                ending: ending,
                godfatherRating: godfatherRating,
                laureateRating: laureateRating
            })
            .then((Meeting) => {
                res.status(201).json(Meeting);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    },

    update (req, res) {
        const { fkGodfatherAccountId, fkLaureateAccountId, beginning, ending, godfatherRating, laureateRating } = req.body;

        return Meeting
            .update({
                fkGodfatherAccountId: fkGodfatherAccountId,
                fkLaureateAccountId: fkLaureateAccountId,
                beginning: beginning,
                ending: ending,
                godfatherRating: godfatherRating,
                laureateRating: laureateRating
            }, {
                where: {
                    meetingId: req.params.id
                }
            })
            .then(([, meeting]) => res.status(200).json(meeting[0]))
            .catch((error) => console.log(error));
    },

    delete (req, res) {
        Meeting
            .findOne({
                where: {
                    meetingId: req.params.id
                }
            })
            .then(entity => {
                if (!entity) {
                    return res.status(400).json({
                        message: 'Model Not Found',
                    });
                }
                return Meeting
                    .destroy()
                    .then(() => res.status(204).json())
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    },

    getById (req, res) {
        return Meeting
            .findOne({
                where: {
                    meetingId: req.params.id
                }
            })
            .then((meeting) => {
                if (!meeting) {
                    return res.status(404).json({
                        message: 'Meeting Not Found',
                    });
                }
                return res.status(200).json(meeting[0]);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: 'Internal error' });
            });
    }
};
