'use strict';
const mongoose = require('mongoose');

const seriesSchema = mongoose.Schema({
  series: Number
});

const SeriesModel = mongoose.model('Series', seriesSchema);


module.exports = SeriesModel;