'use strict';
const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    name: String,
    index: Number
});

const ImageModel = mongoose.model('Image', imageSchema);

// let testImage = new ImageModel({ name: 'pic1.jpg' });
// testImage.save();

module.exports = ImageModel;