const router = require('express').Router();
const ImageModel = require('../models/imageModel');
const UserModel = require('../models/userModel');
const SeriesModel = require('../models/seriesModel');
const mongoose = require('mongoose');
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

router.post('/add-new-image', function({body}, res) {
  const {imageSeriesCode, login} = body;
  let imageSeries = null;

  if (!imageSeriesCode || !mongoose.Types.ObjectId.isValid(imageSeriesCode)) return res.status(500).send('Неверный код');
  if (!login) return res.status(404).send('Не передано имя пользователя');

  function newUserImageRegister(user) {
    if (!user) return Promise.reject('Пользователь не найден');
    if (user.accessToSeries && user.accessToSeries.includes(imageSeries)) return Promise.reject('Такое фото у пользователя уже есть');
    return UserModel.update(
      {login},
      {$push: {accessToSeries: imageSeries}},
      {safe: true, upsert: false, new : false}
    )
  }
  function checkUserSeriesExist(series) {
    imageSeries = series;
    return UserModel
      .findOne({login}).exec()
  }

  function checkImageExist(model) {
    if (model && model.series) return Promise.resolve(model.series);
    return Promise.reject('Не найден код фото');
  }

  SeriesModel
    .findOne({_id: imageSeriesCode})
    .then(checkImageExist)
    .then(checkUserSeriesExist)
    .then(newUserImageRegister)
    .then(() => res.status(200).send('Новая серия добавлена'))
    .catch(err => {
      res.status(404).send(err.toString());
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

function makeImagesLinksForPaginationLine(accessToSeries) {
  let imageListTemplate = [];
  for(let i = 1; i <= IMAGES_COUNT; i++) {
    imageListTemplate.push(accessToSeries.indexOf(i) !== -1);
  }
  return imageListTemplate;
}

function groupImagesBySeries(images) {
  let imagesBySeries = {};
  images.forEach(image => {
    if (!imagesBySeries[image.series]) imagesBySeries[image.series] = [];
    imagesBySeries[image.series].push(image);
  });
  return imagesBySeries
}

router.get('/available', function(req, res) {
  const login = req.query.login;
  let currentUser;

  function prepearImageListTemplate(imagesList) {
    imagesList = groupImagesBySeries(imagesList);
    res.status(200).send({
      paginationList: makeImagesLinksForPaginationLine(currentUser.accessToSeries),
      list: imagesList,
      defaultPage: currentUser.accessToSeries[0]
    });
  }

  function getNamesOfAvaliableImages(user) {
    if(!user) return Promise.reject(`Не найдень пользователь с ником "${login}"`);
    currentUser = user;
    const criteria = {
      series: {
        $in: user.accessToSeries
      }
    };
    return ImageModel.find(criteria)
  }

  if(!login) return res.status(500).send('Ошибка в никнейме');

  UserModel
    .findOne({login})
    .exec()
    .then(getNamesOfAvaliableImages)
    .then(prepearImageListTemplate)
    .catch(err => {
      res.status(404).send(err);
      console.error(err);
    });
});

module.exports = router;
