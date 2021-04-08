const Account = require('../models/Account');
const config = require('../config/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

module.exports = {
  list(req, res) {
    
    return Account
      .findAll()
      .then((accounts) => res.status(200).send(accounts))
      .catch((error) => { res.status(400).send(error); });
  },
  login(req,res){
      return Account
      .findOne({where:{userName:req.body.userName}})
      .then((account)=>{
        if(!account){
          return res.status(404).send({
            message: 'Account Not Found',
          });
        }
        else{
          console.log("here am i");

          const checkPassword = bcrypt.compareSync(req.body.password,account.password);
          console.log(checkPassword);
          console.log(account.password);
          console.log(account.userName);
          if(checkPassword){
            var token = jwt.sign({ id: account.id }, config.secret, {
              expiresIn: 86400 // 24 hours
            });
          }
          else{
            return res.status(404).send({
              message: 'wrong password',
            });
          }
        }
      })
  },

  getById(req, res) {
    return Account
      .findById(req.params.id)
      .then((account) => {
        if (!account) {
          return res.status(404).send({
            message: 'Account Not Found',
          });
        }
        return res.status(200).send(account);
      })
      .catch((error) => {
          res.status(400).send(error)
      });
  },

  add(req, res) {
    const hash = bcrypt.hashSync(req.body.password,salt);
    return Account
      .create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          email: req.body.email,
          passwordHash: req.body.passwordHash,
          role: req.body.role,
          isArchived: req.body.isArchived,
          resetKey: req.body.resetKey
      })
      .then((Account) => {
          res.status(201).send(Account)
      })
      .catch((error) => {
          res.status(400).send(error)
      });
  },

  update(req, res) {
    return Account
      .findById(req.params.id)
      .then(account => {
        if (!account) {
          return res.status(404).send({
            message: 'Account Not Found',
          });
        }
        return Account
          .update({
            password: req.body.password,
          })
          .then(() => res.status(200).send(account))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Account
      .findById(req.params.id)
      .then(account => {
        if (!account) {
          return res.status(400).send({
            message: 'Account Not Found',
          });
        }
        return Account
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
