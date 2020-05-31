const { Router } = require('express');
const PokemonsService = require('../services/pokemons.service');
// const Pokemon = require('../schemas/pokemon');

const router = Router();

router.get('/', (req, res) => {
  PokemonsService.getAllPokemons(req, res);
});

router.get('/:id', (req, res) => {
  PokemonsService.getPokemonById(req, res);
});

router.post('/', (req, res) => {
  PokemonsService.addPokemon(req, res);
});

router.patch('/:id', (req, res) => {
  PokemonsService.updatePokemon(req, res);
});

router.delete('/:id', (req, res) => {
  PokemonsService.deletePokemon(req, res);
});

module.exports = router;
