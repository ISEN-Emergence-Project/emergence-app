const bcrypt = require('bcrypt');

/* FUNCTIONS */

const list = (req, res, Model) => {
    return Model
        .findAll()
        .then((entities) => res.status(200).json(entities))
        .catch((error) => res.status(400).json(error));
}

const insert = (req, res, Model) => {
    const hash = bcrypt.hashSync(req.body.password, salt);
    return Model
        .create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            passwordHash: hash,
            role: req.body.role,
            isArchived: req.body.isArchived,
            resetKey: req.body.resetKey
        })
        .then((Model) => {
            res.status(201).json(Model);
        })
        .catch((error) => {
            res.status(400).json(JSON.stringify(error));
        });
}

const update = (req, res, Model) => {
    return Model
        .findById(req.params.id)
        .then(entity => {
            if (!entity) {
                return res.status(404).json({
                    message: 'Model Not Found',
                });
            }
            return Model
                .update({
                    password: req.body.password,
                })
                .then(() => res.status(200).json(entity))
                .catch((error) => res.status(400).json(JSON.stringify(error)));
        })
        .catch((error) => res.status(400).json(JSON.stringify(error)));
}

const del = (req, res, Model) => {
    return Model
        .findById(req.params.id)
        .then(entity => {
            if (!entity) {
                return res.status(400).json({
                    message: 'Model Not Found',
                });
            }
            return Model
                .destroy()
                .then(() => res.status(204).json())
                .catch((error) => res.status(400).json(JSON.stringify(error)));
        })
        .catch((error) => res.status(400).json(JSON.stringify(error)));
}

module.exports = {
    list,
    insert,
    update,
    delete: del
};
