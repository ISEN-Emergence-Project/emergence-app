const { Form, Question } = require('../models');

module.exports = {
  list(req, res) {
    return Form
      .findAll({
        include: [{
          model: Question,
          as: 'questions'
        }],
      })
      .then((forms) => res.status(200).send(forms))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Form
      .findById(req.params.id, {
        include: [{
          model: Question,
          as: 'questions'
        }],
      })
      .then((form) => {
        if (!form) {
          return res.status(404).send({
            message: 'Form Not Found',
          });
        }
        return res.status(200).send(form);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Form
      .create({
        title: req.body.title,
        description:req.body.description,
        banner_url:req.body.banner_url,
      })
      .then((form) => res.status(201).send(form))
      .catch((error) => res.status(400).send(error));
  },

  addQuestion(req, res) {
    return Form
      .findById(req.body.form_id, {
        include: [{
          model: Question,
          as: 'questions'
        }],
      })
      .then((form) => {
        if (!form) {
          return res.status(404).send({
            message: 'Form Not Found',
          });
        }
        Question.findById(req.body.form_id).then((course) => {
          if (!course) {
            return res.status(404).send({
              message: 'Question Not Found',
            });
          }
          form.addQuestion(course);
          return res.status(200).send(form);
        })
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Form
      .findById(req.params.id, {
        include: [{
          model: Question,
          as: 'questions'
        }],
      })
      .then(form => {
        if (!form) {
          return res.status(404).send({
            message: 'Form Not Found',
          });
        }
        return form
          .update({
            title: req.body.title || Question.title,
          })
          .then(() => res.status(200).send(Form))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Form
      .findById(req.params.id)
      .then(form => {
        if (!form) {
          return res.status(400).send({
            message: 'Form Not Found',
          });
        }
        return form
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
