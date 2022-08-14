const mongoose = require('mongoose');

const source = new mongoose.Schema({
    type: { type: String},
    text: { type: String },
    related_type: { },
    related_id: { }
})

const spell = new mongoose.Schema({
    id: { type: Number, require: true, unique: true},
    name: { type: String },
    description: { type: String },
    patch: { type: String },
    icon: { type: String },
    owned: { type: String },
    sources: { },
})

const model = mongoose.model('Spell', spell);

module.exports = model;