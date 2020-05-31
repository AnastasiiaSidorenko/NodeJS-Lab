const { Router } = require('express');
const CatchPokemonService = require('../services/catchPokemon.service');

const catchPokemon = Router();

catchPokemon.patch('/:id', (req, res) => {
  CatchPokemonService.catchPokemon(req, res);
});

module.exports = catchPokemon;
