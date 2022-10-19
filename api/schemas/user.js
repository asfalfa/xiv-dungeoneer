const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username: { type: String, require: true, unique: true},
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    accessToken: { type: String, require: true },
})

const model = mongoose.model('User', user);

module.exports = model;