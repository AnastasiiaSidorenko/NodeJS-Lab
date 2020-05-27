const { Router } = require('express');
const Pokemon = require('../schemas/pokemon');

const pokemons = Router();

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

module.exports = pokemons;