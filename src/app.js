const { Router } = require('express');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const Pokemon = require('./schemas/pokemon');
const User = require('./schemas/user');

const app = express();
const port = 8080;
const DB = mongoose.connection;
const DB_URL = 'mongodb://localhost:27017/pokedex';

const pokemons = Router();
const router = Router();
const caughtPokemons = Router();
const catchPokemon = Router();

const passport = require('./routes/password');
const auth = require('./routes/auth');

app.use(express.json());
// app.use('/', pokemons);
// app.use('/', router);
router.use('/auth', passport.authenticate('local', { session: false }), auth);
router.use('/pokemons', passport.authenticate('bearer', { session: false }), pokemons);
router.use('/caughtPokemons', passport.authenticate('bearer', { session: false }), caughtPokemons);
router.use('/catchPokemon', passport.authenticate('bearer', { session: false }), catchPokemon);

app.use('/', router);

const defaultPokemons = JSON.parse(fs.readFileSync('../pokemons.json'));
const defaultUsers = JSON.parse(fs.readFileSync('../users.json'));

pokemons.get('/', (req, res) => {
    const name = req.query.name;
    let query;
    if (name) {
        query = Pokemon.find({ name });
    } else {
        query = Pokemon.find({});
    }
    query.exec((err, pokemons) => {
        if (err) {
            res.status(500).json({
                status: 'Request failed',
                message: err
            });
        }
        res.status(200).json({
            status: 'success',
            results: pokemons.length,
            data: {
                pokemons
            }
        });
    });
});

pokemons.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = Pokemon.findById(id);
    query.exec((err, pokemon) => {
        if (err) {
            return res.status(500).json({
                status: 'Request failed',
                message: err
            });
        }
        if (!pokemon) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid id'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                pokemon
            }
        });
    });
});

caughtPokemons.get('/', (req, res) => {
    const caughtPokemons = defaultPokemons.filter(pokemon => pokemon.isCaught);

    res.status(200).json({
        status: 'success',
        data: {
            pokemons: caughtPokemons
        }
    });
});

pokemons.post('/', (req, res) => {
    const newPokemon = {
        name: '',
        damage: '',
        isCaught: '',
        createdAt: '',
        id: null,
        ...req.body
    };
    Pokemon.create(newPokemon, (err, pokemon) => {
        if (err) {
            return res.status(500).json({
                status: 'Request failed',
                message: err
            });
        }
        res.status(201).json({
            status: 'success',
            data: {
                pokemon
            }
        });
    });
});

pokemons.patch('/:id', (req, res) => {
    const id = req.params.id;
    const newPokemon = {
        ...req.body
    };
    const query = Pokemon.findByIdAndUpdate(id, newPokemon, { new: true });
    query.exec((err, pokemon) => {
        if (err) {
            return res.status(500).json({
                status: 'Request failed',
                message: err
            });
        }
        if (!pokemon) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid id'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                pokemon
            }
        })
    })
});

catchPokemon.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = defaultPokemons.find(item => item.id === id);

    if (!pokemon) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid id'
        });
    }

    pokemon.isCaught = true;

    res.status(200).json({
        status: 'success',
        data: {
            pokemon
        }
    })
});

pokemons.delete('/:id', (req, res) => {
    const id = req.params.id;
    const query = Pokemon.findByIdAndDelete(id);
    query.exec((err, pokemon) => {
        if (err) {
            return res.status(500).json({
                status: 'Request failed',
                message: err
            });
        }
        if (!pokemon) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid id'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    });
});

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

function loadDefaultPokemons() {
    Pokemon.insertMany(defaultPokemons, (err) => {
        if (err) {
            console.log('Pokemons request failed');
        }
        console.log('Pokemons are saved!');
    });
}

function loadDefaultUsers() {
    User.insertMany(defaultUsers, (err) => {
        if (err) {
            console.log('Users request failed');
        }
        console.log('Users are saved!');
    });
}

