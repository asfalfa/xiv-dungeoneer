const mongoose = require('mongoose');

const dungeon = new mongoose.Schema({
    id: { type: Number, require: true, unique: true},
    name: { type: String },
    description: { type: String },
    banner: { type: String },
    patch: { type: String },
});

const model = mongoose.model('Dungeon', dungeon);

module.exports = model;