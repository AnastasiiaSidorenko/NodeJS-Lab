const { Router } = require('express');
const fs = require('fs');

const caughtPokemons = Router();

const defaultPokemons = JSON.parse(fs.readFileSync('../pokemons.json'));

caughtPokemons.get('/', (req, res) => {
  const pokemons = defaultPokemons.filter((pokemon) => pokemon.isCaught);

  res.status(200).json({
    status: 'success',
    data: {
      pokemons,
    },
  });
});

module.exports = caughtPokemons;
