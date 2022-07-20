const mongoose = require('mongoose');

const source = new mongoose.Schema({
    type: { type: String},
    text: { type: String },
    related_type: { type: String },
});

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
});

const mount = new mongoose.Schema({
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
});

const category = new mongoose.Schema({
    id: { type: Number },
    name: { type: String }
});

const orchestrion = new mongoose.Schema({
    id: { type: Number, require: true, unique: true},
    name: { type: String },
    description: { type: String },
    patch: { type: String },
    icon: { type: String },
    owned: { type: String },
    number: { type: String },
    category: { type: category }
});

const dungeon = new mongoose.Schema({
    id: { type: Number},
    name: { type: String },
});

const matchedDungeon = new mongoose.Schema({
    dungeon: { type: dungeon },
    orchestrions: { type: [orchestrion] },
    minions: { type: [minion] },
    mounts: { type: [mount] },
});

const model = mongoose.model('Dungeon', matchedDungeon);

module.exports = model;