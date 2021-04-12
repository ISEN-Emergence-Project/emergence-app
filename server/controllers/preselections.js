const { Preselection } = require('../models');

function list(req, res) {
    return Preselection
        .findAll()
        .then((preselections) => res.status(200).json({'preselections': [preselections]}))
        .catch((error) => res.status(400).json(error));
}

module.exports = {
    list,

};
