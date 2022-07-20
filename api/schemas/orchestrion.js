const mongoose = require('mongoose');

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
})

const model = mongoose.model('Orchestrion', orchestrion);

module.exports = model;