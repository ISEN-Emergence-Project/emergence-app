const { Match } = require('../models');

function list(req, res) {
    return Match
        .findAll()
        .then((matches) => res.status(200).json({'matches': [matches]}))
        .catch((error) => res.status(400).json(error));
}

module.exports = {
    list,

};
