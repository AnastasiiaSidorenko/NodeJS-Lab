const express = require('express');
const mongoose = require('mongoose');
const Pokemon = require('./schemas/pokemon');
const User = require('./schemas/user');
const { loadDefaultPokemons, loadDefaultUsers } = require('./loadDefaultData');

const app = express();
const port = 8080;
const DB = mongoose.connection;
const DB_URL = 'mongodb://localhost:27017/pokedex';

const router = require('./routes/router');

app.use(express.json());
app.use('/', router);

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
app.listen(port, () => console.log(`app is running on port ${port}`));

DB.once('open', () => {
    console.log('DB connected');
    Pokemon.find({}, (err, pokemons) => {
        if (!pokemons.length) {
            loadDefaultPokemons();
        }
    });
    User.find({}, (err, users) => {
        if (!users.length) {
            loadDefaultUsers();
        }
    });
});