const { Router } = require('express');
const fs = require('fs');

const catchPokemon = Router();

const defaultPokemons = JSON.parse(fs.readFileSync('../pokemons.json'));

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

module.exports = catchPokemon;