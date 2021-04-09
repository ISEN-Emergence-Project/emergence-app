const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../config/auth');
const Account = require('../models/Account');

const salt = bcrypt.genSaltSync(10);

module.exports = {
  list(req, res) {
      return Account
          .findAll()
          .then((accounts) => res.status(200).json(accounts))
          .catch((error) => { res.status(400).json(JSON.stringify(error)) });
  },
  login(req,res) {
      return Account
          .findOne({where: { username: req.body.username }})
          .then((account) => {
              if (!account){
                  return res.status(403).json({
                      message: 'Account Not Found',
                  });
              }
              else {
                  const checkPassword = bcrypt.compareSync(req.body.password, account.passwordHash);
                  // check if password match hash
                  if (checkPassword) {
                      const token = jwt.sign({id: account.id}, config.secret, {
                          expiresIn: 86400 // 24 hours
                      });
                      return res.status(200).json({
                          message: 'Connected',
                          username: account.username,
                          token: token
                      });
                  }
                  else{
                      return res.status(403).json({
                          message: 'Wrong password',
                      });
                  }
              }
          })
          /*.catch((error) => {
              res.status(400).json(JSON.stringify(error));
          });*/
  },

  getById(req, res) {
    return Account
      .findById(req.params.id)
      .then((account) => {
        if (!account) {
          return res.status(404).json({
            message: 'Account Not Found',
          });
        }
        return res.status(200).json(account);
      })
      .catch((error) => {
          res.status(400).json(JSON.stringify(error));
      });
  },

  add(req, res) {
      const hash = bcrypt.hashSync(req.body.password, salt);
      return Account
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
          .then((Account) => {
              res.status(201).json(Account);
          })
          .catch((error) => {
              res.status(400).json(JSON.stringify(error));
          });
  },

  update(req, res) {
    return Account
        .findById(req.params.id)
        .then(account => {
            if (!account) {
                return res.status(404).json({
                message: 'Account Not Found',
            });
        }
        return Account
          .update({
            password: req.body.password,
          })
          .then(() => res.status(200).json(account))
          .catch((error) => res.status(400).json(JSON.stringify(error)));
      })
      .catch((error) => res.status(400).json(JSON.stringify(error)));
  },

  delete(req, res) {
    return Account
      .findById(req.params.id)
      .then(account => {
        if (!account) {
          return res.status(400).json({
            message: 'Account Not Found',
          });
        }
        return Account
          .destroy()
          .then(() => res.status(204).json())
          .catch((error) => res.status(400).json(JSON.stringify(error)));
      })
      .catch((error) => res.status(400).json(JSON.stringify(error)));
  },
    logout (req, res) {
      return res.json('Not implemented');
    }
};
