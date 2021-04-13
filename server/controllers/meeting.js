const { Meeting } = require('../models');

function list(req, res) {
    return Meeting
        .findAll()
        .then((meetings) => res.status(200).json({'meetings': [meetings]}))
        .catch((error) => res.status(400).json(error));
}

module.exports = {
    list,

};
