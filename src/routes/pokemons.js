const { Router } = require('express');
const Pokemon = require('../schemas/pokemon');

const router = Router();

router.get('/', (req, res) => {
  const { name } = req.query;
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
        message: err,
      });
    }
    res.status(200).json({
      status: 'success',
      results: pokemons.length,
      data: {
        pokemons,
      },
    });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = Pokemon.findById(id);
  query.exec((err, pokemon) => {
    if (err) {
      return res.status(500).json({
        status: 'Request failed',
        message: err,
      });
    }
    if (!pokemon) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid id',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        pokemon,
      },
    });
  });
});

router.post('/', (req, res) => {
  const newPokemon = {
    name: '',
    damage: '',
    isCaught: '',
    createdAt: '',
    id: null,
    ...req.body,
  };
  Pokemon.create(newPokemon, (err, pokemon) => {
    if (err) {
      return res.status(500).json({
        status: 'Request failed',
        message: err,
      });
    }
    res.status(201).json({
      status: 'success',
      data: {
        pokemon,
      },
    });
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const newPokemon = {
    ...req.body,
  };
  const query = Pokemon.findByIdAndUpdate(id, newPokemon, { new: true });
  query.exec((err, pokemon) => {
    if (err) {
      return res.status(500).json({
        status: 'Request failed',
        message: err,
      });
    }
    if (!pokemon) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid id',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        pokemon,
      },
    });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = Pokemon.findByIdAndDelete(id);
  query.exec((err, pokemon) => {
    if (err) {
      return res.status(500).json({
        status: 'Request failed',
        message: err,
      });
    }
    if (!pokemon) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid id',
      });
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
});

module.exports = router;
