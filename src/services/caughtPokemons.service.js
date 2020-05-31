const fs = require('fs');

const defaultPokemons = JSON.parse(fs.readFileSync('../pokemons.json'));

function getCaughtPokemons(req, res) {
    const pokemons = defaultPokemons.filter((pokemon) => pokemon.isCaught);

    res.status(200).json({
        status: 'success',
        data: {
            pokemons,
        },
    });
}

module.exports = {
    getCaughtPokemons
}