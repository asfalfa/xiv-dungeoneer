const mongoose = require('mongoose');

const XIVAPIMinion = new mongoose.Schema({
    name: { type: String},
    icon: { type: String },
});

const XIVAPIMount = new mongoose.Schema({
    name: { type: String},
    icon: { type: String },
});
const CharacterDetails = new mongoose.Schema({
    id: { type: Number, require: true, unique: true},
    name: { type: String },
    server: { type: String },
    dc: { type: String },
    avatar: { type: String },
    portrait: { type: String },
    gender: { type: Number },
    bio: { type: String },
    FreeCompanyId: { type: String },
    FreeCompanyName: { type: String },
});

const CharacterInfo = new mongoose.Schema({
    character: { type: CharacterDetails },
    minions: { type: [XIVAPIMinion] },
    mounts: { type: [XIVAPIMount] },
});

const model = mongoose.model('Character', CharacterInfo);

module.exports = model;