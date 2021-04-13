const { Meeting } = require('../models');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Meeting);
    },

    insert (req, res) {
        return Meeting
            .create({
                fkGodfatherAccountId: req.body.fkGodfatherAccountId,
                fkLaureateAccountId: req.body.fkLaureateAccountId,
                beginning: req.body.beginning,
                ending: req.body.ending,
                godfatherRating: req.body.godfatherRating,
                laureateRating: req.body.laureateRating
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
        return Meeting
            .update({
                fkGodfatherAccountId: req.body.fkGodfatherAccountId,
                fkLaureateAccountId: req.body.fkLaureateAccountId,
                beginning: req.body.beginning,
                ending: req.body.ending,
                godfatherRating: req.body.godfatherRating,
                laureateRating: req.body.laureateRating
            }, {
                where: {
                    meetingId: req.params.id
                }
            })
            .then(([, meeting]) => res.status(200).json(meeting[0]))
            .catch((error) => console.log(error));
    },

    delete (req, res) {
        return commonsController.delete(req, res, Meeting);
    },

    getById (req, res) {
        return Meeting
            .findAll({
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
