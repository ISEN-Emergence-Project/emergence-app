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
    }
};
