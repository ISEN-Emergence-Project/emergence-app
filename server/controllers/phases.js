const Phase = require('../models/Phase');

const commonsController = require('./commons');

/* FUNCTIONS */

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Phase);
    },

    getById (req, res) {
        return Phase
            .findOne({
                where: {
                    phaseId: req.params.id
                }
            })
            .then((phase) => {
                if (!phase) {
                    return res.status(404).json({
                        message: 'Phase Not Found',
                    });
                }
                return res.status(200).json(phase);
            })
            .catch((error) => {
                console.log(error);
                res.status(404).json({ message: 'Phase not found' });
            });
    },

    update (req, res) {
        const { lead, buttonText, buttonLink } = req.body;

        return Phase
            .update({
                lead: lead,
                buttonText: buttonText,
                buttonLink: buttonLink
            }, {
                where: {
                    phaseId: req.params.id
                },
                returning: true
            })
            .then(([, phase]) => {
                if (!phase[0]) {
                    return res.status(404).json({ message: 'Phase not found' });
                }
                return res.status(200).json(phase[0])
            })
            .catch((error) => {
                console.log(error);
                if (error.name === "SequelizeUniqueConstraintError") {
                    return res.status(400).json(error);
                } else {
                    return res.status(500).json({ message: 'Internal Error' });
                }
            });
    }
};
