const { Router } = require('express');
const CaughtPokemonsService = require('../services/caughtPokemons.service');

const caughtPokemons = Router();

caughtPokemons.get('/', (req, res) => {
  CaughtPokemonsService.getCaughtPokemons(req, res);
});

module.exports = caughtPokemons;
