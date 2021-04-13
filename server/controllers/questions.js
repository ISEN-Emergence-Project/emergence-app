const { Answer, Form, Question } = require('../models');

module.exports = {
  list(req, res) {
    return Question
      .findAll({
        include: [{
          model: Answer,
          as: 'answers'
        }],
      })
      .then((questions) => res.status(200).send(questions))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Question
      .findById(req.params.id, {
        include: [{
          model: Form,
          as: 'form'
        }],
      })
      .then((question) => {
        if (!question) {
          return res.status(404).send({
            message: 'question Not Found',
          });
        }
        return res.status(200).send(question);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Question
      .create({
        form_id: req.body.form_id,
        question: req.body.question,
        description: req.body.description,
      })
      .then((question) => res.status(201).send(question))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Question
      .findById(req.params.id, {
        include: [{
          model: Form,
          as: 'form'
        }],
      })
      .then(question => {
        if (!question) {
          return res.status(404).send({
            message: 'question Not Found',
          });
        }
        return Question
          .update({
            question: req.body.question || Form.question,
            description: req.body.description || Form.description,
          })
          .then(() => res.status(200).send(question))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Question
      .findById(req.params.id)
      .then(question => {
        if (!question) {
          return res.status(400).send({
            message: 'Question Not Found',
          });
        }
        return Question
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
