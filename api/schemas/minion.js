const mongoose = require('mongoose');

const source = new mongoose.Schema({
    type: { type: String},
    text: { type: String },
    related_type: { type: String },
})

const minion = new mongoose.Schema({
    id: { type: Number, require: true, unique: true},
    name: { type: String },
    description: { type: String },
    enhanced_description: { type: String },
    tooltip: { type: String },
    patch: { type: String },
    image: { type: String },
    icon: { type: String },
    owned: { type: String },
    player_owns: { type: Boolean },
    sources: { type: [source] },
})

const model = mongoose.model('Minion', minion);

module.exports = model;