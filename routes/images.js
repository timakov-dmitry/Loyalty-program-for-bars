const router = require('express').Router();
const ImageModel = require('../models/imageModel');
const UserModel = require('../models/userModel');
const IMAGES_COUNT = 6;

router.get('/', function(req, res) {
  const imageCode = req.query.code;
  ImageModel
    .findOne({_id: imageCode})
    .then(image => {
      if(!image) return Promise.reject('Не найдено фото');
      res.status(200).send('images', {
        path: image.name,
        title: 'Express'
      });
    })
    .catch(err => {
      res.status(400).send('error');
      console.error(err);
    })
});

router.post('/add-new', function({body}, res) {
  const {imageCode, login} = body;

  function newUserImageRegister(user) {
    if (user && user.login === login) return Promise.reject('Такое фото у пользователя уже есть');
    return UserModel.update(
      {login},
      {$push: {recentImages: imageCode}},
      {safe: true, upsert: false, new : false}
    )
  }
  function checkUserImageExist(image) {
    return UserModel.findOne({recentImages: image._id}).exec()
  }
  function checkImageExist(image) {
    return image => image ? Promise.resolve(image) : Promise.reject('Не найдено фото');
  }

  ImageModel
    .findOne({_id: imageCode})
    .then(checkImageExist)
    .then(checkUserImageExist)
    .then(newUserImageRegister)
    .then(image => res.status(200).send(image.index))
    .catch(err => {
      res.status(400).send('error');
      console.error(err);
    })
});

function makeImagesChainForSlaider(userRecentImages) {
  let imagesSliderTemplate = [];
  for(let i = 1; i <= IMAGES_COUNT; i++) {
    let image = userRecentImages.find(image => image.index === i);
    imagesSliderTemplate.push(image ? `<div class="carousel-cell"><img src="/comix/${image.name}"></div>` : `<div class="carousel-cell"><img src="/comix/404image.jpg"></div>`);
  }
  return imagesSliderTemplate;
}

function makeImagesLinksForPaginationLine(userRecentImages) {
  let imageListTemplate = [];
  for(let i = 1; i <= IMAGES_COUNT; i++) {
    let image = userRecentImages.find(image => image.index === i);
    imageListTemplate.push(!!image);
  }
  return imageListTemplate;
}

router.get('/available', function(req, res) {
  const login = req.query.login;
  function prepearImageListTemplate(user) {
    if(!user) return Promise.reject(`Не найдень пользователь с ником "${login}"`);    
    res.status(200).send({
      paginationList :makeImagesLinksForPaginationLine(user.recentImages),
      list: user.recentImages
    });
  }

  if(!login) return res.status(500).send('Ошибка в никнейме');

  UserModel
    .findOne({login})
    .populate('recentImages')
    .exec()
    .then(prepearImageListTemplate)
    .catch(err => {
      res.status(404).send(err);
      console.error(err);
    });
});

module.exports = router;
