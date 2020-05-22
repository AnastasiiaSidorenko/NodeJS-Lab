const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
    id: Number,
    name: String,
    damage: Number,
    isCaught: Boolean,
    createdAt: String
});

module.exports = mongoose.model('Pokemon', PokemonSchema);