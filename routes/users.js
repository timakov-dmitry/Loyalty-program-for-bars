const router = require('express').Router();
const UserModel = require('../models/userModel');
const ImageModel = require('../models/imageModel');


router.get('/', function(req, res, next) {
  const login = req.query.login;
  if (!login) return res.status(500).send('Укажите ник пользователя');

  UserModel
    .findOne({login})
    .then(user => {
      if (!user) return Promise.reject('Пользователь с таким ником не зарегистрирован');
        return res.status(200).send(user);
    })
    .catch(err => {
      res.status(404).send(err);
      console.error(err);
    });
});

router.post('/', function(req, res, next) {
  const newUser = {
    login: req.body.login
  };
  UserModel
      .findOne({login: newUser.login})
      .then(user => {
        if (!user) return UserModel.create(newUser);
        return Promise.reject('Пользоватль с таким ником уже зарегистрирован')
      })
      .then(user => res.status(200).send(newUser))
      .catch(err => res.status(400).send(err));
});

module.exports = router;
