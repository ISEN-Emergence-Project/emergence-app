/* FUNCTIONS */

module.exports = {
    list (req, res, Model) {
        Model
            .findAll()
            .then((entities) => res.status(200).json(entities))
            .catch((error) => res.status(400).json(error));
    },

    delete (req, res, Model) {
        Model
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
};
