const mongoose = require('mongoose');

const source2 = new mongoose.Schema({
    npcs: {},
    packs: {},
    drops: {},
    purchase: {}
})

const card = new mongoose.Schema({
    id: { type: Number, require: true, unique: true},
    name: { type: String },
    description: { type: String },
    patch: { type: String },
    icon: { type: String },
    owned: { type: String },
    sources: { type: source2 },
})

const model = mongoose.model('Card', card);

module.exports = model;