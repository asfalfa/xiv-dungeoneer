const mongoose = require('mongoose');

const CharacterInfo = new mongoose.Schema({
    id: { type: Number, require: true, unique: true},
    name: { type: String },
    server: { type: String },
    dc: { type: String },
    avatar: { type: String },
    portrait: { type: String },
    freeCompany: { type: String },
    minions: { },
    mounts: { },
    orchestrions: { },
    spells: { },
    cards: { },
});

const model = mongoose.model('Character', CharacterInfo);

module.exports = model;