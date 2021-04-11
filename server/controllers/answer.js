const Answer = require('../models').Answer;
const Account = require('../models').Account;
const Question = require('../models').Question;

module.exports = {
  list(req, res) {
    return Answer
      .findAll()
      .then((answers) => res.status(200).send(answers))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Answer
      .findById(req.params.id)
      .then((answer) => {
        if (answer) {
          return res.status(404).send({
            message: 'Answer Not Found',
          });
        }
        return res.status(200).send(answer);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Answer
      .create({
        account_id: req.body.account_id,
        question_id: req.body.question_id,
        answer: req.body.answer,
      })
      .then((Answer) => res.status(201).send(Answer))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Answer
      .findById(req.params.id)
      .then(Answer => {
        if (!Answer) {
          return res.status(404).send({
            message: 'Answer Not Found',
          });
        }
        return Answer
          .update({
            Answer: req.body.Answer || Account.Answer,
            description: req.body.description || Account.description,
          })
          .then(() => res.status(200).send(Answer))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Answer
      .findById(req.params.id)
      .then(Answer => {
        if (!Answer) {
          return res.status(400).send({
            message: 'Answer Not Found',
          });
        }
        return Answer
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};