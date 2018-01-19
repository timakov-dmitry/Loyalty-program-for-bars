'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    login: {
        type: String,
        unique: true
    },
    accessToSeries: [{
        type: Number
    }]
});

const UserModel = mongoose.model('User', userSchema);

// let testUser = new UserModel({
//     login: 'zxc',
//     recentImages: ['59edb3dfa5130e220f31ccba']
// });
//
// testUser.save();

module.exports = UserModel;