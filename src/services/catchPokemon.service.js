const fs = require('fs');

const defaultPokemons = JSON.parse(fs.readFileSync('../pokemons.json'));

function catchPokemon(req, res) {
    const id = parseInt(req.params.id, 10);
    const pokemon = defaultPokemons.find((item) => item.id === id);

    if (!pokemon) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid id',
        });
    }

    pokemon.isCaught = true;

    res.status(200).json({
        status: 'success',
        data: {
            pokemon,
        },
    });
}

module.exports = {
    catchPokemon
}